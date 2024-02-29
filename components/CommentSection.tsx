import React, { useState } from 'react';

interface CommentSectionProps {
  onCommentSubmit: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      onCommentSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-3">Comments</h2>
      <div>
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
