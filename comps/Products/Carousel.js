  import { useState, useEffect } from "react";

  const Carousel = () => {
    const images = [
        "https://cdn.pixabay.com/photo/2017/02/11/20/51/fashion-2058703_960_720.jpg",
        "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-soldiervip-1308881.jpg&fm=jpg",
        "https://img.freepik.com/photos-premium/femme-profitant-foret-automne_539387-36.jpg",
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Function to go to the next image
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // Function to go to the previous image
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
      return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);
  
    return (
      <div className="carousel-container">
        <div className="carousel-images">
          <img src={images[currentIndex]} alt="carousel" />
        </div>
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        <style jsx>{`
          .carousel-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: auto;
          }
          .carousel-images {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .carousel-images img {
            width: 100%;
            height: auto;
            transition: opacity 1s ease;
          }
          button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
          }
          .prev {
            left: 0;
          }
          .next {
            right: 0;
          }
          .carousel-dots {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
          }
          .dot {
            height: 10px;
            width: 10px;
            margin: 0 5px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.3s;
            cursor: pointer;
          }
          .dot.active {
            background-color: #717171;
          }
        `}</style>
      </div>
    );
  };
  
  export default Carousel;
  