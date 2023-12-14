import React from 'react';
import './BlogPost.css';

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2 className="post-username">{post.username}</h2>
      <p className="post-content">{post.content}</p>
      <div className="post-time">{post.time}</div>
    </div>
  );
};

export default BlogPost;
