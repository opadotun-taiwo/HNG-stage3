// components/Card.tsx
import React from 'react';

const Card = ({ id, src, title }: any) => {
  return (
    <div
      className="flex justify-center p-4 border border-gray-300 rounded-md cursor-move"
      data-drag-handle
    >
      <img src={src} alt={title} />
    </div>
  );
};

export default Card;
