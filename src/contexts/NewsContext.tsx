import React, { createContext, useContext, ReactNode } from 'react';
import { Article } from '../types';
import { 
  fetchArticles, 
  fetchArticleById, 
  fetchArticleBySlug, 
  fetchAllArticles, 
  fetchAuthors, 
  createArticle as createArticleAPI, 
  updateArticle as updateArticleAPI, 
  deleteArticle as deleteArticleAPI 
} from '/programas/oii/api';

interface NewsContextType {
  getFeaturedArticles: () => Promise<Article[]>;
  getLatestArticles: (limit?: number) => Promise<Article[]>;
  getArticlesByCategory: (category: string, limit?: number) => Promise<Article[]>;
  getArticleById: (id: string) => Promise<Article>;
  getArticleBySlug: (slug: string) => Promise<Article>;
  getAllArticles: () => Promise<Article[]>;
  getRelatedArticles: (articleId: string, category: string, limit?: number) => Promise<Article[]>;
  createArticle: (article: Partial<Article>) => Promise<Article>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;
  searchArticles: (query: string, tag?: string) => Promise<Article[]>;
  getCategories: () => Promise<string[]>;
  getAuthors: () => Promise<string[]>;
  getStats: () => Promise<{
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    categories: number;
    recentViews: number;
  }>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {

  const getFeaturedArticles = async (): Promise<Article[]> => {
    const articles = await fetchArticles();
    return articles.filter(article => article.featured).slice(0, 5);
  };

  const getLatestArticles = async (limit = 10): Promise<Article[]> => {
    const articles = await fetchAllArticles();
    return articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .filter(article => !article.isDraft)
      .slice(0, limit);
  };

  const getArticlesByCategory = async (category: string, limit = 10): Promise<Article[]> => {
    const articles = await fetchAllArticles();
    return articles
      .filter(article => 
        article.category === category || 
        article.category.includes(category) || 
        category.includes(article.category)
      )
      .filter(article => !article.isDraft)
      .slice(0, limit);
  };

  const getArticleById = async (id: string): Promise<Article> => {
    return await fetchArticleById(id);
  };

  const getArticleBySlug = async (slug: string): Promise<Article> => {
    return await fetchArticleBySlug(slug);
  };

  const getAllArticles = async (): Promise<Article[]> => {
    return await fetchAllArticles();
  };

  const getRelatedArticles = async (articleId: string, category: string, limit = 3): Promise<Article[]> => {
    const articles = await fetchAllArticles();
    return articles
      .filter(article => article.id !== articleId && article.category === category && !article.isDraft)
      .slice(0, limit);
  };

  const createArticle = async (article: Partial<Article>): Promise<Article> => {
    return await createArticleAPI(article);
  };

  const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
    return await updateArticleAPI(id, article);
  };

  const deleteArticle = async (id: string): Promise<void> => {
    await deleteArticleAPI(id);
  };

  const searchArticles = async (query: string, tag?: string): Promise<Article[]> => {
    const articles = await fetchAllArticles();
    let results = articles.filter(article => !article.isDraft);
    
    if (tag) {
      results = results.filter(article => 
        article.tags && article.tags.some(t => 
          t.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        (article.content && article.content.toLowerCase().includes(lowercaseQuery)) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    return results;
  };

  const getCategories = async (): Promise<string[]> => {
    const articles = await fetchAllArticles();
    const categories = new Set(articles.map(article => article.category));
    return Array.from(categories);
  };

  const getAuthors = async (): Promise<string[]> => {
    const authors = await fetchAuthors();
    return authors;
  };

  const getStats = async () => {
    const articles = await fetchAllArticles();
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(article => !article.isDraft).length;
    const draftArticles = articles.filter(article => article.isDraft).length;
    
    const categories = new Set(articles.map(article => article.category)).size;
    
    const recentViews = Math.floor(Math.random() * 1000) + 500;
    
    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      categories,
      recentViews,
    };
  };

  return (
    <NewsContext.Provider
      value={{
        getFeaturedArticles,
        getLatestArticles,
        getArticlesByCategory,
        getArticleById,
        getArticleBySlug,
        getAllArticles,
        getRelatedArticles,
        createArticle,
        updateArticle,
        deleteArticle,
        searchArticles,
        getCategories,
        getAuthors,
        getStats,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
