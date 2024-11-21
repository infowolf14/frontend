import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.text}</p>
      ))}
    </div>
  );
};

export default CommentList;
