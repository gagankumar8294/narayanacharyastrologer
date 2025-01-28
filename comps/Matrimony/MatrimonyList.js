import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { matrimonialDb } from '@/fireConfig';
export default function MatrimonyList() {
  const [users, setUsers] = useState([]);
  const db = getFirestore(matrimonialDb);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'matrimonialuserdata'));
        const userList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userList.push({
            id: doc.id,
            name: data.name,
            age: data.age,
            profilePhoto: data.profilePhoto,
          });
        });
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [db]);

  return (
    <div>
      <h1>Matrimonial Users</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              width: '200px',
            }}
          >
            <img
              src={user.profilePhoto}
              alt={`${user.name}'s profile`}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
