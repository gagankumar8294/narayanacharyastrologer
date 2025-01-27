import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import { db } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/router';

function AddBlogs() {
    const [sections, setSections] = useState([{ type: "title", value: "", alt: "" }]);
    const [blogs, setBlogs] = useState([]);
    const titleRef = useRef(null);
    const router = useRouter();
    const [slug, setSlug] = useState(""); // New state for slug

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "matrimonialuserdata"), (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sections: data.sections || [], // Ensure sections is always an array
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
            const reader = new FileReader();
            reader.onload = (event) => {
                const updatedSections = [...sections];
                updatedSections[index].value = event.target.result; // Store Base64 string
                setSections(updatedSections);
            };
            reader.readAsDataURL(file); // Convert to Base64
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!slug) {
            alert("Please enter a slug for the blog post.");
            return;
        }

        const blogData = {
            createdOn: new Date(),
            sections,
            slug: slug.toLowerCase().replace(/ /g, '-')
        };

        try {
            const docRef = await addDoc(collection(db, "matrimonialuserdata"), blogData);
            console.log("Document written with ID: ", docRef.id);
            setSections([{ type: "title", value: "" }]);
            setSlug(""); // Reset the slug field after submission
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function removeBlog(id) {
        const docRef = doc(db, "matrimonialuserdata", id);
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
                            <option value="image" style={{ color: "gray" }}>Image</option>
                        </select>

                        <button className={styles.btn} type="submit">Submit Blog</button>
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
