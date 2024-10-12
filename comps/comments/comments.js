// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// const DynamicComments = dynamic(() => import('react-facebook').then((mod) => mod.Comments), {
//   ssr: false,
// });

// const CommentsExample = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null; // Render nothing on the server-side
//   }

//   return (
//     <div>
//       <h1>My First Blog Post</h1>
//       <p>This is my first blog post. I'm excited to share it with you!</p>
//       <DynamicComments href="http://localhost:3000/blog/first-post" />
//     </div>
//   );
// };

// export default CommentsExample;