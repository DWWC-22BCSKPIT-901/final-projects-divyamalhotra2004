import React, { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  user_id: string;
}

export function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      setPosts(data || []);
    }
  }

  async function handleSubmitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('forum_posts').insert([
      {
        ...newPost,
        user_id: user.id
      }
    ]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      setNewPost({ title: '', content: '', category: 'general' });
      loadPosts();
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <p className="mt-4 text-lg text-gray-600">
          Connect with others, share experiences, and find support
        </p>
      </div>

      {user && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="general">General Discussion</option>
                <option value="marriage">Marriage</option>
                <option value="custody">Child Custody</option>
                <option value="property">Property</option>
              </select>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Post
            </button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="inline-flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>12 replies</span>
              </span>
              <button className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}