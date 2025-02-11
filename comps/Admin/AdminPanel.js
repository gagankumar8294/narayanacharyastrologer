import React, { useState } from "react";
import styles from "./AdminPanel.module.css";
import AddBlog from "@/pages/blog/add";
import AddProduct from "../Products/Products";

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeSection, setActiveSection] = useState("blogs");

    const handleLogin = () => {
        if (password === "vishwakarma") { // Change this to a more secure approach in production
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password!");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.admin_login}>
                <h2>Admin Login</h2>
                <input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <section className={styles.admin_comp}>
            <h2>Welcome to Admin Panel</h2>
            <div className={styles.buttonContainer}>
                <button onClick={() => setActiveSection("blogs")}>Blogs</button>
                <button onClick={() => setActiveSection("products")}>Products</button>
                <button onClick={() => setActiveSection("matrimony")}>Matrimony</button>
            </div>

            <div className={styles.content}>
                {activeSection === "blogs" && <Blogs />}
                {activeSection === "products" && <Products />}
                {activeSection === "matrimony" && <Matrimony />}
            </div>
        </section>
    );
};

// Sample Components
const Blogs = () => <><AddBlog /></>;
const Products = () => <><AddProduct /></>;
const Matrimony = () => <div><h3>Manage Matrimony</h3></div>;

export default AdminPanel;
