import { useEffect, useState } from 'react';

const AutoTypingText = ({ textList, typingDelay, erasingDelay, pauseDelay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = textList[currentIndex];

      if (isTyping) {
        setDisplayText(currentText.substring(0, displayText.length + 1));

        if (displayText === currentText) {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentIndex((currentIndex + 1) % textList.length);
          }, pauseDelay);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));

        if (displayText === '') {
          setIsTyping(true);
          setCurrentIndex((currentIndex + 1) % textList.length);
        }
      }
    }, isTyping ? typingDelay : erasingDelay);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, textList, typingDelay, erasingDelay, pauseDelay]);

  return <span>{displayText}</span>;
};

export default AutoTypingText;