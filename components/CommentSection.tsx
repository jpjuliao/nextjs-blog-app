import React, { useState } from 'react';
import { CommentSectionProps } from '@/types'

const CommentSection: React.FC<CommentSectionProps> = ({ onCommentSubmit }) => {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    if (name.trim() !== '' && comment.trim() !== '') {
      onCommentSubmit(name, comment);
      setName('');
      setComment('');
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-3">Comments</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
        ></textarea>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
