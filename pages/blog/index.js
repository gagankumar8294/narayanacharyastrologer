import Blogs from "@/comps/Blogs/Blogs";
import ErrorBoundary from "@/comps/ErrorHandling/ErrorBoundary";

const blog = () => {
    return (
        <>
        <h1  style={{ paddingTop: '100px' }}></h1>
            <ErrorBoundary>
                <Blogs/>
            </ErrorBoundary>
            
        </>
    );
}

export default blog;