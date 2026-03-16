import React from 'react';

const ImageGallery = () => {
 
  const images = ['profile.jpg', 'tic-tac-toe.jpg','home.jpg','tic-tac-toe.jpg']; 

  return (
    <div>
      
      {images.map((imageName, index) => (
        <img 
          key={index} 
          src={`${process.env.PUBLIC_URL}/uploads/${imageName}`} 
          alt={`Upload ${index + 1}`} 
          style={{ width: '200px', margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
