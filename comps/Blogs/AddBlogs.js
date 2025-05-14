import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';

function AddBlogs() {
    const [sections, setSections] = useState([{ type: "title", value: "", alt: "" }]);
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sections: data.sections || [],
                    createdOn: data.createdOn ? data.createdOn.toDate() : null,
                    slug: data.slug || '',
                    category: data.category || ''
                };
            });
            setBlogs(blogs);
        });
        return () => unsub();
    }, []);

    const addSection = (type) => {
        if (!type) return;
        setSections([...sections, { type, value: "", alt: "" }]);
    };

    const handleSectionChange = (index, value) => {
        const updatedSections = [...sections];
        updatedSections[index].value = value;
        setSections(updatedSections);
    };

    const handleAltTextChange = (index, value) => {
        const updatedSections = [...sections];
        updatedSections[index].alt = value;
        setSections(updatedSections);
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedSections = [...sections];
            updatedSections[index].value = file;
            setSections(updatedSections);
        }
    };

    const handleLinkChange = (index, value, isText) => {
        const updatedSections = [...sections];
        if (isText) {
            updatedSections[index].linkText = value;
        } else {
            updatedSections[index].value = value;
        }
        setSections(updatedSections);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!slug || !category) {
            alert("Please enter a slug and category.");
            return;
        }

        const blogData = {
            createdOn: new Date(),
            sections: [],
            slug: slug.toLowerCase().replace(/ /g, '-'),
            category,
        };

        for (const section of sections) {
            if (section.type === "image" && section.value instanceof File) {
                const storageRef = ref(storage, `blog-images/${section.value.name}`);
                const uploadTask = uploadBytesResumable(storageRef, section.value);

                await new Promise((resolve, reject) => {
                    uploadTask.on("state_changed", null, reject, async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        blogData.sections.push({ type: "image", value: downloadURL, alt: section.alt || '' });
                        resolve();
                    });
                });
            } else {
                blogData.sections.push(section);
            }
        }

        try {
            if (isEditing && selectedBlogId) {
                await updateDoc(doc(db, "blogs", selectedBlogId), blogData);
                setIsEditing(false);
                setSelectedBlogId(null);
            } else {
                await addDoc(collection(db, "blogs"), blogData);
            }
            resetForm();
        } catch (e) {
            console.error("Error saving blog:", e);
        }
    }

    const handleEdit = (blog) => {
        setIsEditing(true);
        setSelectedBlogId(blog.id);
        setSlug(blog.slug || "");
        setCategory(blog.category || "");
        setSections(blog.sections || []);
        titleRef.current?.focus();
    };

    const removeBlog = async (id) => {
        await deleteDoc(doc(db, "blogs", id));
        if (isEditing && selectedBlogId === id) {
            resetForm();
        }
    };

    const resetForm = () => {
        setSections([{ type: "title", value: "", alt: "" }]);
        setSlug("");
        setCategory("");
        setIsEditing(false);
        setSelectedBlogId(null);
    };

    return (
        <section className={styles.blogs_Section}>
            <h2 className={styles.heading}>{isEditing ? "Edit Blog" : "Add Blog"}</h2>
            <div className={styles.section}>
                <form onSubmit={handleSubmit}>
                    <Row label="Slug">
                        <input className={styles.input} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" />
                    </Row>
                    <Row label="Category">
                        <select className={styles.input} value={category} onChange={handleCategoryChange}>
                            <option value="" disabled>Select category</option>
                            <option value="astrology">Astrology</option>
                            <option value="numerology">Numerology</option>
                            <option value="vaastu">Vaastu</option>
                            <option value="yantra-mantra-tantra">Yantra Mantra Tantra</option>
                        </select>
                    </Row>

                    {sections.map((section, index) => (
                        <div key={index}>
                            {section.type === "title" && (
                                <Row label="Title">
                                    <input
                                        className={styles.input}
                                        value={section.value}
                                        onChange={(e) => handleSectionChange(index, e.target.value)}
                                        ref={index === 0 ? titleRef : null}
                                    />
                                </Row>
                            )}
                            {["h1", "h2", "h3", "paragraph"].includes(section.type) && (
                                <Row label={section.type.toUpperCase()}>
                                    <textarea
                                        className={styles.content}
                                        value={section.value}
                                        onChange={(e) => handleSectionChange(index, e.target.value)}
                                    />
                                </Row>
                            )}
                            {section.type === "link" && (
                                <Row label="Link">
                                    <input
                                        className={styles.input}
                                        placeholder="Link text"
                                        value={section.linkText || ""}
                                        onChange={(e) => handleLinkChange(index, e.target.value, true)}
                                    />
                                    <input
                                        className={styles.input}
                                        placeholder="URL"
                                        value={section.value}
                                        onChange={(e) => handleLinkChange(index, e.target.value, false)}
                                    />
                                </Row>
                            )}
                            {section.type === "image" && (
                                <>
                                    <Row label="Image">
                                        <input type="file" onChange={(e) => handleImageChange(index, e)} />
                                    </Row>
                                    <Row label="Alt Text">
                                        <textarea
                                            className={styles.input}
                                            placeholder="Alt text"
                                            value={section.alt || ""}
                                            onChange={(e) => handleAltTextChange(index, e.target.value)}
                                        />
                                    </Row>
                                </>
                            )}
                        </div>
                    ))}

                    <select onChange={(e) => addSection(e.target.value)}>
                        <option value="">Add Section</option>
                        <option value="title">Title</option>
                        <option value="h1">H1 Heading</option>
                        <option value="h2">H2 Heading</option>
                        <option value="h3">H3 Heading</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="link">Link</option>
                        <option value="image">Image</option>
                    </select>

                    <button className={styles.btn} type="submit">
                        {isEditing ? "Update Blog" : "Submit Blog"}
                    </button>
                </form>
            </div>

            <h2>Blogs</h2>
            <div className={styles.blogList}>
                {blogs.map((blog) => {
                    const firstImage = blog.sections.find(s => s.type === "image");
                    const firstTitle = blog.sections.find(s => s.type === "title");

                    return (
                        <div className={styles.blogCard} key={blog.id}>
                            {firstImage && <img src={firstImage.value} alt="Blog" width="200" height="150" />}
                            {firstTitle && <h3>{firstTitle.value}</h3>}
                            {blog.createdOn && <p>Created On: {blog.createdOn.toLocaleString()}</p>}
                            <button onClick={() => handleEdit(blog)} className={styles.readMore}>Edit</button>
                            <button onClick={() => removeBlog(blog.id)} className={styles.readMore}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function Row({ label, children }) {
    return (
        <>
            <label>{label}</label><br />
            {children}
            <hr />
        </>
    );
}

export default AddBlogs;
