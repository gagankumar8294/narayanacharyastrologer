import { useEffect, useState } from 'react';

const AutoTypingText = ({ textList, typingDelay, erasingDelay, pauseDelay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const currentText = textList[currentIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingDelay);
      } else {
        // Full sentence is complete: wait for pauseDelay (1 second) before erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDelay);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, erasingDelay);
      } else {
        // Sentence erased: move to next text and start typing
        timeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % textList.length);
          setIsTyping(true);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, textList, typingDelay, erasingDelay, pauseDelay]);

  return <span>{displayText}</span>;
};

export default AutoTypingText;