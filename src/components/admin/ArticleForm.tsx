import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Save, Upload, X } from 'lucide-react';
import { Article, Author } from '../../types';
import RichTextEditor from './RichTextEditor';
import { fetchAuthors } from '../../api';

interface ArticleFormProps {
  article?: Article;
  onSave: (articleData: Partial<Article>, isDraft: boolean) => Promise<void>;
  onPreview: (articleData: Partial<Article>) => void;
}

const initialState: Partial<Article> = {
  title: '',
  subtitle: '',
  content: '',
  excerpt: '',
  category: '',
  tags: [],
  imageUrl: '',
  seoTitle: '',
  seoDescription: '',
  seoImage: '',
  authorId: '',
  isDraft: true,
  featured: false
};

const categories = [
  'tech', 'ai', 'gadgets', 'internet',
  'geopolitics', 'global-market', 'conflicts', 'diplomacy',
  'programming', 'web', 'mobile', 'devops',
  'games', 'console', 'pc', 'mobile-gaming'
];

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onPreview }) => {
  const [formData, setFormData] = useState<Partial<Article>>(initialState);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const authorsList = await fetchAuthors();
        setAuthors(authorsList);
      } catch (error) {
        console.error('Error loading authors:', error);
      }
    };
    loadAuthors();
  }, []);

  useEffect(() => {
    if (article) {
      setFormData({
        ...article,
        authorId: article.authorId || authors[0]?.id
      });
      setImagePreview(article.imageUrl || null);
    } else {
      setFormData(prev => ({
        ...prev,
        authorId: authors[0]?.id
      }));
    }
  }, [article, authors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const articleData = {
        ...formData,
        isDraft,
        slug: formData.slug || generateSlug(formData.title || ''),
        publishedAt: formData.publishedAt || now,
        updatedAt: now
      };
      await onSave(articleData, isDraft);
      navigate('/admin');
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium mb-1">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Content *
            </label>
            <RichTextEditor 
              initialValue={formData.content || ''} 
              onChange={handleContentChange} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="authorId" className="block text-sm font-medium mb-1">
              Author *
            </label>
            <select
              id="authorId"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="input-field flex-grow"
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-md transition-colors duration-200"
              >
                Add
              </button>
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-neutral-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 p-1 rounded-full hover:bg-neutral-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Featured Image *
            </label>
            <div className="border border-neutral-300 rounded-md p-4">
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 bg-neutral-100 rounded-md mb-4">
                  <p className="text-neutral-400">No image selected</p>
                </div>
              )}
              <label className="flex items-center justify-center px-4 py-2 bg-white border border-neutral-300 rounded-md cursor-pointer hover:bg-neutral-50 transition-colors duration-200">
                <Upload className="h-4 w-4 mr-2" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="featured" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Featured Article</span>
            </label>
          </div>

          <div className="pt-4 border-t border-neutral-200">
            <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="seoTitle" className="block text-sm font-medium mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  id="seoTitle"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Leave blank to use article title"
                />
              </div>
              
              <div>
                <label htmlFor="seoDescription" className="block text-sm font-medium mb-1">
                  SEO Description
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Leave blank to use article excerpt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-neutral-200">
        <button
          type="button"
          onClick={handlePreview}
          className="btn btn-outline flex items-center"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          className="btn btn-outline flex items-center"
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          className="btn btn-primary flex items-center"
          disabled={isSaving}
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;