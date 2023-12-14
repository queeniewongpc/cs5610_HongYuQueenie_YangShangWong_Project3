import React, { useState } from 'react';
import './BlogForm.css';

const BlogForm = ({ addBlogPost }) => {
  const [title] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      title,
      content,
      username,
      time: new Date().toLocaleString(),
    };
    addBlogPost(newPost);
    setContent('');
    setUsername('');
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          className="form-field input-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          className="form-field textarea-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit" className="submit-btn">Post</button>
      </form>
    </div>
  );
};

export default BlogForm;
