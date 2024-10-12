import React, { useRef, useState } from 'react';
import styles from '../../styles/Subscribe.module.css'

function Subscribe() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('');
 
  const subscribe = async (e) => {
    e.preventDefault();
 
    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
 
    const { error } = await res.json();
 
    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);
 
      return;
    }
 
    // 5. Clear the input value and show a success message.
    inputEl.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };
 
  return (
    <div style={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center', 
       height: '50vh' ,
      //  backgroundColor: 'red',
       }}>
  <form
    className={styles.formu}
    onSubmit={subscribe}
    style={{
      backgroundColor: 'rgba(230, 220, 245, 0.116)',
      // backgroundColor: 'rgba(230, 220, 245, 0.2)',
      backdropFilter: 'blur(5px)',
      // zIndex:999,
      width: '600px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.3s',
      borderRadius: '5px',
    '@media (max-width: 1250px)': {
      width: '80%',
    },
    '@media (max-width: 900px)': {
      width: '90%',
    },
    '@media (max-width: 600px)': {
      width: '95%',
    },
    '@media (max-width: 400px)': {
      width: '100%',
    },
  }}
  
  onMouseEnter={(e) => {
    /*---------    FORM-BACKGROUND---------*/
    e.target.style.backgroundColor = 'rgba(230, 220, 245, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'rgba(230, 220, 245, 0.116)';
  }}>
    <label htmlFor="email-input" 
           style={{ color: 'yellow',
                    marginBottom: '10px',
                    background: 'none',
                  }}>
            {'Email Address '}
    </label>
    <input
      id="email-input"
      className={styles.inputbox}
      name="email"
      placeholder="Enter your email address"
      ref={inputEl}
      required
      type="email"
      style={{
        transition: 'placeholder 0.3s ease',
        marginBottom: '10px',
        marginLeft: "10px",
        width: "225px",
        textAlign: "center",
        // paddingRight: "10px"
        // borderColor: 'pink', 
      }}
      onFocus={(e) => {
        e.target.placeholder = '';
        e.target.style.color = 'yellow';
        e.target.style.backgroundColor = '#000';
      }}
      onBlur={(e) => {
        e.target.placeholder = 'Enter your email address';
        e.target.style.color = 'yellow';
        e.target.style.backgroundColor = '#000';
      }}
    />
    <div style={{ 
      color: 'rgb(201, 10, 138)',
      fontWeight: 'bold',
      background: 'none',
      marginBottom: '20px',
      marginTop: '10px',
       }}>
      {message ? message : `Register for additional Perks`}
    </div>
    <button
      type="submit"
      style={{
        color: 'white',
        backgroundColor: 'purple',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        '@media (hover: hover)': {
          ':hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
          },
          ':hover::after': {
            content: "'✉️ Click to Subscribe!'",
          },
        },
      }}>
      {'Subscribe'}
    </button>
  </form>
</div>
    
  );
}

export default Subscribe;