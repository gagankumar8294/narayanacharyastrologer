import React, { useState, useEffect } from 'react';
import styles from "../../styles/Video.module.css";
import FacebookComments from '../../comps/comments/FacebookComments';
// import dynamic from 'next/dynamic';


// const DynamicFacebookComments = dynamic(() => import('../../comps/comments/FacebookComments'), {
//   ssr: false, // Render only on the client
// });

const VideoPlayer = () => {
  const videoData = [
    { title: '1. HTML for Beginners 2023', youtubeId: 'xA-jy5B9_K0' },
    { title: '2. HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: '3. Visual studio code install ', youtubeId: 'uwFjG_i6hJw' },
    { title: '4. installing sublime in windows 11', youtubeId: 'wGP6_hk0BC0' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML for Beginners 2023', youtubeId: 'xA-jy5B9_K0' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'Visual studio code install ', youtubeId: 'uwFjG_i6hJw' },
    { title: 'installing sublime in windows 11', youtubeId: 'wGP6_hk0BC0' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    { title: 'HTML coding environment setup', youtubeId: '4uiyGqTgAV4' },
    // Add more video data
  ];




  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width and update the state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);





  const [selectedVideo, setSelectedVideo] = useState(videoData[0].youtubeId);
  

  
  // Conditionally initialize based on window width (only on the client)
  const [showVideoTitle, setShowVideoTitle] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 769 : false
  );


  const handleVideoClick = (youtubeId) => {
    setSelectedVideo(youtubeId);
  };

  const handleTitleClick = () => {
    setShowVideoTitle(!showVideoTitle); // Toggle visibility of video title
  };


  return (
    <div className={styles.wholepage}>
      <div className={styles.course_name}>
          <h2>large large large large large</h2>
      </div>
      <div className={styles.video_container}>
        <div className={styles.video_titles}>
          <div className={styles.title_icon} onClick={handleTitleClick}>
            <svg className={styles.circle_right} version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
              <path d="M5.543 11.043l1.414 1.414 4.457-4.457-4.457-4.457-1.414 1.414 3.043 3.043z"></path>
            </svg>
          </div>
            {showVideoTitle && (
          <div className={styles.title_content}>
              {videoData.map((video, index) => (
            <div className={styles.title_content}
                // key={video.youtubeId}
                key={`${video.youtubeId}_${index}`} // Unique key using youtubeId and index
                onClick={() => handleVideoClick(video.youtubeId)}
            >
              {video.title}
            </div>
                ))}
          </div>
                )}
        </div>
        <div className={styles.video_embed}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            frameBorder="0"
            allowFullScreen>
          </iframe>
          <div className={styles.type_yt}>
             <FacebookComments href="https://codeaspirant.vercel.app/videos/html/videos/html_for_beginners" />
          </div>
        </div>
        <div className={styles.type_yt_mobile }>
             <FacebookComments href="https://codeaspirant.vercel.app/videos/html/videos"/>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
