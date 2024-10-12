const SingleBlogPost = ({ blogPost }) => {
    return (
      <div>
        <h1>{blogPost.title}</h1>
        <p>{blogPost.createdAt}</p>
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </div>
    );
  };
  
  export default SingleBlogPost;