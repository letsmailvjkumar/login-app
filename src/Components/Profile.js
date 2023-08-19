import React, { useEffect, useState } from 'react';
import "../Profile.css";
const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) { // Add a conditional check for user.id
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/users/${user.id}`);

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserDetails();
    }
  }, [user]);

  return (
      <div>
      <h1>Profile</h1>
      <div className='profile'>
      <img src={userDetails.image} alt="User Profile" />
      <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
      <p>Gender: {userDetails.gender}</p>
      </div>
    </div>
  );
};

export default Profile;
