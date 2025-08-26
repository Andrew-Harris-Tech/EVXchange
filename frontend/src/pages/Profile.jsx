import React from 'react';
import { useAuth } from '../components/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user info as needed */}
    </div>
  );
};

export default Profile;
