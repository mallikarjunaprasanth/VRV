import { useState } from 'react';
import { loginUsers } from '../assets/JsonFIles/JSON';

const CredentialsButton = () => {
  const [showCredentials, setShowCredentials] = useState(false);

  const handleClick = () => {
    setShowCredentials(!showCredentials);
  };

  // Define styles as objects
  const buttonStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-1px)'
    }
  };

  const modalStyles = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 1000,
    minWidth: '300px',
    border: '1px solid #e5e7eb'
  };

  return (
    <>
      <button 
        style={buttonStyles}
        onClick={handleClick}
        title="Show Credentials"
      >
        Credentials
      </button>

      {showCredentials && (
        <div style={modalStyles}>
          <h2 style={{ 
            margin: '0 0 16px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            User Credentials
          </h2>
          {loginUsers.map((user) => (
            <div key={user.id} style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <p style={{ margin: '0 0 8px 0', color: '#4b5563' }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ margin: '0', color: '#4b5563' }}>
                <strong>Password:</strong> {user.password}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CredentialsButton; 