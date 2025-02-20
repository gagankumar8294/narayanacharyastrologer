import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';

function AddBlogs() {
    const [sections, setSections] = useState([{ type: "title", value: "", alt: "" }]);
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null); // Track blog being edited
    const titleRef = useRef(null);
    const router = useRouter();
    const [slug, setSlug] = useState(""); 
    const [category, setCategory] = useState("");

    useEffect(() => {
        titleRef.current.focus();
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

    async function handleSubmit(e) {
        e.preventDefault();

        if (!slug || !category) {
            alert("Please enter a slug and category for the blog post.");
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
                    uploadTask.on(
                        "state_changed",
                        () => {},
                        (error) => {
                            console.error("Error uploading image:", error);
                            reject(error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            blogData.sections.push({ type: "image", value: downloadURL });
                            resolve();
                        }
                    );
                });
            } else {
                blogData.sections.push(section);
            }
        }

        try {
            if (editingBlog) {
                const docRef = doc(db, "blogs", editingBlog.id);
                await updateDoc(docRef, blogData);
                console.log("Blog updated:", editingBlog.id);
            } else {
                const docRef = await addDoc(collection(db, "blogs"), blogData);
                console.log("Blog added:", docRef.id);
            }
            
            setSections([{ type: "title", value: "" }]);
            setSlug("");
            setCategory("");
            setEditingBlog(null);
        } catch (e) {
            console.error("Error saving blog:", e);
        }
    }

    async function removeBlog(id) {
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
    }

    const handleEditBlog = (blog) => {
        setEditingBlog(blog);
        setSlug(blog.slug);
        setCategory(blog.category);
        setSections(blog.sections);
    };

    return (
        <>
            <section className={styles.blogs_Section}>
                <h2 className={styles.heading}>{editingBlog ? "Edit Blog" : "Add Blog"}</h2>
                <div className={styles.section}>
                    <form onSubmit={handleSubmit}>
                        <Row label="Slug">
                            <input
                                className={styles.input}
                                placeholder="Enter the Slug Here..."
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </Row>
                        <Row label="Category">
                            <select
                                className={styles.input}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>Select a category</option>
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
                                            placeholder="Enter the Title Here..."
                                            value={section.value}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                            ref={index === 0 ? titleRef : null}
                                        />
                                    </Row>
                                )}
                                {["h1", "h2", "h3", "paragraph"].includes(section.type) && (
                                    <Row label={`Enter ${section.type.toUpperCase()} Text`}>
                                        <textarea
                                            className={styles.content}
                                            placeholder={`Enter the ${section.type.toUpperCase()} Text Here...`}
                                            value={section.value}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                        />
                                    </Row>
                                )}
                            </div>
                        ))}
                        <button className={styles.btn} type="submit">
                            {editingBlog ? "Update Blog" : "Submit Blog"}
                        </button>
                    </form>
                </div>

                <h2>Blogs</h2>
                <div className={styles.blogList}>
                    {blogs.map((blog) => (
                        <div className={styles.blogCard} key={blog.id}>
                            <h3>{blog.slug}</h3>
                            <p>Category: {blog.category}</p>
                            <p>Created On: {blog.createdOn?.toLocaleString()}</p>
                            <button onClick={() => handleEditBlog(blog)} className={styles.readMore}>Edit</button>
                            <button onClick={() => removeBlog(blog.id)} className={styles.delete}>Delete</button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

function Row({ label, children }) {
    return (
        <>
            <label>{label}<br /></label>
            {children}
            <hr />
        </>
    );
}

export default AddBlogs;
