import React, { useState, useEffect } from 'react';
import { User, Upload, Trash2, Edit } from 'lucide-react';
import { Author } from '../../types';
import { fetchAuthors } from '../../api';

interface UserFormData {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

const UserManagement: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    bio: '',
    avatarUrl: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const authorsList = await fetchAuthors();
      setAuthors(authorsList);
    } catch (error) {
      console.error('Error loading authors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save image to backend/images folder
      const formData = new FormData();
      formData.append('image', file);
      
      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        const imageUrl = `http://localhost:3001/images/${data.filename}`;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, avatarUrl: imageUrl }));
      })
      .catch(error => console.error('Error uploading image:', error));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        loadAuthors();
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          bio: '',
          avatarUrl: ''
        });
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error creating author:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center"
        >
          <User className="h-5 w-5 mr-2" />
          Add New User
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image</label>
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                )}
                <label className="btn btn-outline flex items-center cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="input-field"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save User
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {authors.map(author => (
            <div key={author.id} className="bg-neutral-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{author.name}</h3>
                  <p className="text-sm text-neutral-500">{author.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-neutral-200 rounded-full">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-neutral-200 rounded-full text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{author.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;