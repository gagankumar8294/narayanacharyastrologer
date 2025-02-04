import Blogs from "@/comps/Blogs/Blogs";
import ErrorBoundary from "@/comps/ErrorHandling/ErrorBoundary";

const blog = () => {
    return (
        <>
            <ErrorBoundary style={{ paddingTop: '100px' }}>
                <Blogs/>
            </ErrorBoundary>
            
        </>
    );
}

export default blog;