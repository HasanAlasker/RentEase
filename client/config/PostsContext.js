import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const PostContext = createContext();

const STORAGE_KEY = 'posts';

const saveData = async (posts) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const loadData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

// Provider
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const initializeData = async () => {
      try {
        const loadedPosts = await loadData();
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Save data whenever posts change (except initial load)
  useEffect(() => {
    if (!isLoading) {
      saveData(posts);
    }
  }, [posts, isLoading]);

  const addPost = (post) => {
    setPosts((prev) => {
      const newPosts = [post, ...prev];
      return newPosts;
    });
  };

  const removePost = (id) => {
    setPosts((prev) => {
      const newPosts = prev.filter((p) => p.id !== id);
      return newPosts;
    });
  };

  const updatePost = (id, updatedPost) => {
    setPosts((prev) => {
      const newPosts = prev.map((post) => 
        post.id === id ? { ...post, ...updatedPost } : post
      );
      return newPosts;
    });
  };

  const clearAllPosts = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setPosts([]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      addPost, 
      removePost, 
      updatePost,
      clearAllPosts,
      isLoading 
    }}>
      {children}
    </PostContext.Provider>
  );
}

// Hook for easy usage
export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}