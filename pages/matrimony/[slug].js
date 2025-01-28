import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { matrimonialDb } from '@/fireConfig';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const router = useRouter();
  const { slug } = router.query;  // Get the slug from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchUserBySlug = async () => {
        try {
          const userRef = doc(matrimonialDb, 'matrimonialuserdata', slug); // Use the slug to get the user document
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            setUser(userSnapshot.data());
          } else {
            console.log('User not found!');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserBySlug();
    }
  }, [slug]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.name}>{user.name}</h1>
      <img
        src={user.profilePhoto}
        alt={`${user.name}'s profile`}
        className={styles.profilePhoto}
      />
      <p>Age: {user.age}</p>
      <p>About: {user.about || 'No information available'}</p>
      {/* Add more fields like location, education, etc. */}
    </div>
  );
};

export default UserProfile;
