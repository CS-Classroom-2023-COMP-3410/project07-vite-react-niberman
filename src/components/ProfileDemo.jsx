import React, { useState } from 'react';

// A small component for the header, receiving user data via props
function ProfileHeader({ user }) {
  return (
    <div>
      <h2>Profile of {user.name}</h2>
    </div>
  );
}

// A small component for the body, receiving user data via props
function ProfileBody({ user }) {
  return (
    <div>
      <p>Hello, {user.name}! Welcome to your profile page.</p>
    </div>
  );
}

// Our parent component that "owns" the user data
function ProfileDemo() {
  // Suppose this data might come from a server or state
  const user = { name: 'Alice' };
  
  return (
    <div>
      <h3>Profile Demo (Props & Composition)</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <ProfileHeader user={user} />
        <ProfileBody user={user} />
      </div>
    </div>
  );
}

export default ProfileDemo;
