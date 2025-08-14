import React, { createContext, useState, useContext } from "react";

// Create context
const PostContext = createContext();

// Provider
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]); // Add to the start of the array
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
}

// Hook for easy usage
export function usePosts() {
  return useContext(PostContext);
}
