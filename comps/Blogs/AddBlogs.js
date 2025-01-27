import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'next/router';


function AddBlogs() {
    const [sections, setSections] = useState([{ type: "title", value: "", alt: "" }]);
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);
    const router = useRouter();
    const [slug, setSlug] = useState(""); // New state for slug
    const [category, setCategory] = useState(""); // New state for category


    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sections: data.sections || [],  // Ensure sections is always an array
                    createdOn: data.createdOn ? data.createdOn.toDate() : null,
                    slug: data.slug || (data.sections && data.sections.find(section => section.type === "title"))?.value.toLowerCase().replace(/ /g, '-') || ''
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
            alert("Please enter a slug for the blog post.");
            return;
        }

        const blogData = {
            createdOn: new Date(),
            sections: [],
            slug: slug.toLowerCase().replace(/ /g, '-'),
            //slug: sections[0].value.toLowerCase().replace(/ /g, '-') // Assuming the first section is the title
            category, // Include the selected category
        };

        for (const section of sections) {
            if (section.type === "image" && section.value) {
                const storageRef = ref(storage, `blog-images/${section.value.name}`);
                const uploadTask = uploadBytesResumable(storageRef, section.value);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {},
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
            const docRef = await addDoc(collection(db, "blogs"), blogData);
            console.log("Document written with ID: ", docRef.id);
            setSections([{ type: "title", value: "" }]);
            setSlug("");  // Reset the slug field after submission
            setCategory(""); // Reset category field after submission
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function removeBlog(id) {
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
    }

    const handleReadMore = (blog) => {
        router.push(`/blog/${blog.slug}`);
    };

    return (
        <>
            <section className={styles.blogs_Section}>
                <h2 className={styles.heading}>Blogs</h2>
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
                    onChange={handleCategoryChange}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
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
                                {section.type === "link" && (
                                    <Row label="Link">
                                        <input
                                            className={styles.input}
                                            placeholder="Enter Link Text Here..."
                                            value={section.linkText || ""}
                                            onChange={(e) => handleLinkChange(index, e.target.value, true)}
                                        />
                                        <input
                                            className={styles.input}
                                            placeholder="Enter URL Here..."
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
                                                placeholder="Enter a descriptive alt text for the image..."
                                                value={section.alt}
                                                onChange={(e) => handleAltTextChange(index, e.target.value)}
                                            />
                                        </Row>
                                    </>
                                )}
                            </div>
                        ))}

                        <select onChange={(e) => addSection(e.target.value)}>
                            <option value="" style={{ color: "gray" }}>Add Section</option>
                            <option value="title" style={{ color: "gray" }}>Title</option>
                            <option value="h1" style={{ color: "gray" }}>H1 Heading</option>
                            <option value="h2" style={{ color: "gray" }}>H2 Heading</option>
                            <option value="h3" style={{ color: "gray" }}>H3 Heading</option>
                            <option value="paragraph" style={{ color: "gray" }}>Paragraph</option>
                            <option value="link" style={{ color: "gray" }}>Link</option>
                            <option value="image" style={{ color: "gray" }}>Image</option>
                        </select>

                        <button className={styles.btn} type="submit">
                            Submit Blog
                        </button>
                    </form>
                </div>
                <h2>Blogs</h2>
                <div className={styles.blogList}>
                    {blogs.map((blog) => {
                        const firstImage = blog.sections.find(section => section.type === "image");
                        const firstTitle = blog.sections.find(section => section.type === "title");

                        return (
                            <div className={styles.blogCard} key={blog.id}>
                                {firstImage && (
                                    <img
                                        src={firstImage.value}
                                        alt="Blog Image"
                                        style={{ width: "200px", height: "150px" }}
                                    />
                                )}
                                {firstTitle && <h3>{firstTitle.value}</h3>}
                                {blog.createdOn && <p>Created On: {blog.createdOn.toLocaleString()}</p>}
                                <button onClick={() => removeBlog(blog.id)} className={styles.readMore}>
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}

function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    );
}

export default AddBlogs;