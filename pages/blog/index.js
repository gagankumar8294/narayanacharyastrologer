import Blogs from "@/comps/Blogs/Blogs";
import ErrorBoundary from "@/comps/ErrorHandling/ErrorBoundary";

const blog = () => {
    return (
        <>
            <ErrorBoundary>
                <Blogs/>
            </ErrorBoundary>
            
        </>
    );
}

export default blog;