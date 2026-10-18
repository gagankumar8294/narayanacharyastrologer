import Blogs from "@/comps/Blogs/Blogs";
import ErrorBoundary from "@/comps/ErrorHandling/ErrorBoundary";
import SEO from "@/comps/SEO/SEO";

const BlogPage = () => {
    return (
        <div style={{ paddingTop: "100px", minHeight: "80vh", background: "var(--bg-main)" }}>
            <SEO
                title="Vedic Astrology & Vaastu Blog - Articles by Narayanacharya"
                description="Explore insightful articles on horoscope analysis, Vaastu Shastra principles, auspicious Muhurthas, and Vedic remedies by Brahma Sri Narayanacharya."
                canonical="https://www.narayanacharyastrologer.com/blog"
            />
            <ErrorBoundary>
                <Blogs />
            </ErrorBoundary>
        </div>
    );
};

export default BlogPage;