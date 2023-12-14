import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Navbar from './Navbar';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  // Load posts from local storage when the component mounts
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        setBlogPosts(JSON.parse(savedPosts));
      }
    } catch (error) {
      console.error('Failed to load posts from localStorage:', error);
    }
  }, []);

  // Save posts to local storage when blogPosts changes
  useEffect(() => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    } catch (error) {
      console.error('Failed to save posts to localStorage:', error);
    }
  }, [blogPosts]);

  const addBlogPost = (newPost) => {
    setBlogPosts([newPost, ...blogPosts]);
  };

  return (
    <div className="home-container">
      <Navbar />
      <BlogForm addBlogPost={addBlogPost} />
      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
