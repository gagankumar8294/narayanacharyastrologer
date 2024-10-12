import React, { useEffect } from 'react';

const FacebookComments = ({ href }) => {
  useEffect(() => {
    if (typeof FB !== 'undefined') {
      FB.XFBML.parse();
    }
  }, [href]);

  return (
    <div className="fb-comments" data-href={href} data-width="100%" data-numposts="5"></div>
  );
};

export default FacebookComments;