import React, { createContext, useContext, ReactNode } from 'react';
import { Article } from '../types';
import * as api from '../api';

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
    return api.fetchFeaturedArticles();
  };

  const getLatestArticles = async (limit = 10): Promise<Article[]> => {
    const articles = await api.fetchArticles();
    return articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .filter(article => !article.isDraft)
      .slice(0, limit);
  };

  const getArticlesByCategory = async (category: string, limit = 10): Promise<Article[]> => {
    const articles = await api.fetchArticlesByCategory(category);
    return articles
      .filter(article => !article.isDraft)
      .slice(0, limit);
  };

  const getArticleById = async (id: string): Promise<Article> => {
    return api.fetchArticleById(id);
  };

  const getArticleBySlug = async (slug: string): Promise<Article> => {
    return api.fetchArticleBySlug(slug);
  };

  const getAllArticles = async (): Promise<Article[]> => {
    const articles = await api.fetchArticles();
    return articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  };

  const getRelatedArticles = async (articleId: string, category: string, limit = 3): Promise<Article[]> => {
    const articles = await api.fetchArticlesByCategory(category);
    return articles
      .filter(article => article.id !== articleId && !article.isDraft)
      .slice(0, limit);
  };

  const createArticle = async (article: Partial<Article>): Promise<Article> => {
    return api.createArticle(article);
  };

  const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
    return api.updateArticle(id, article);
  };

  const deleteArticle = async (id: string): Promise<void> => {
    return api.deleteArticle(id);
  };

  const searchArticles = async (query: string, tag?: string): Promise<Article[]> => {
    return api.searchArticles(query, tag);
  };

  const getCategories = async (): Promise<string[]> => {
    const articles = await api.fetchArticles();
    const categories = new Set(articles.map(article => article.category));
    return Array.from(categories);
  };

  const getAuthors = async (): Promise<string[]> => {
    const authors = await api.fetchAuthors();
    return authors.map(author => author.name);
  };

  const getStats = async () => {
    const articles = await api.fetchArticles();
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