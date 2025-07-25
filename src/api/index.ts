import { Article, Author, ArticleView } from '../types';

const BASE_URL = 'http://localhost:8080/api';

async function handleFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Track article view
export async function trackArticleView(articleId: string): Promise<void> {
  try {
    await handleFetch(`${BASE_URL}/articles/${articleId}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error('Error tracking view:', error);
  }
}

// Get article views
export async function getArticleViews(articleId: string): Promise<number> {
  try {
    const article = await handleFetch(`${BASE_URL}/articles/${articleId}`);
    return article.viewCount || 0;
  } catch (error) {
    console.error('Error getting views:', error);
    return 0;
  }
}

// Articles
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await handleFetch(`${BASE_URL}/articles`);
    return response.content || response; // Spring Boot pagination returns content array
  } catch (error) {
    console.error('Error in fetchArticles:', error);
    throw error;
  }
}

export async function fetchArticleById(id: string): Promise<Article> {
  try {
    return await handleFetch(`${BASE_URL}/articles/${id}`);
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error;
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  try {
    return await handleFetch(`${BASE_URL}/articles/slug/${slug}`);
  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error);
    throw error;
  }
}

export async function fetchFeaturedArticles(): Promise<Article[]> {
  try {
    return await handleFetch(`${BASE_URL}/articles/featured`);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw error;
  }
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const response = await handleFetch(`${BASE_URL}/articles/category/${category}`);
    return response.content || response;
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    throw error;
  }
}

export async function fetchArticlesByAuthor(authorId: string): Promise<Article[]> {
  try {
    const response = await handleFetch(`${BASE_URL}/articles/author/${authorId}`);
    return response.content || response;
  } catch (error) {
    console.error(`Error fetching articles for author ${authorId}:`, error);
    throw error;
  }
}

export async function searchArticles(query: string, tag?: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (tag) params.append('tag', tag);
    
    const response = await handleFetch(`${BASE_URL}/articles/search?${params.toString()}`);
    return response.content || response;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
}

// Create, Update, Delete Operations
export async function createArticle(article: Partial<Article>): Promise<Article> {
  try {
    return await handleFetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
}

export async function updateArticle(id: string, article: Partial<Article>): Promise<Article> {
  try {
    const updatedArticle = await handleFetch(`${BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });

    const author = await handleFetch(`${BASE_URL}/authors/${article.authorId}`);

    return {
      ...updatedArticle,
      author
    };
  } catch (error) {
    console.error(`Error updating article ${id}:`, error);
    throw error;
  }
}

export async function deleteArticle(id: string): Promise<void> {
  try {
    await handleFetch(`${BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting article ${id}:`, error);
    throw error;
  }
}

// Authors
export async function fetchAuthors(): Promise<Author[]> {
  try {
    return await handleFetch(`${BASE_URL}/authors`);
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
}

export async function createAuthor(author: Partial<Author>): Promise<Author> {
  try {
    return await handleFetch(`${BASE_URL}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    });
  } catch (error) {
    console.error('Error creating author:', error);
    throw error;
  }
}

export async function updateAuthor(id: string, author: Partial<Author>): Promise<Author> {
  try {
    return await handleFetch(`${BASE_URL}/authors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    });
  } catch (error) {
    console.error(`Error updating author ${id}:`, error);
    throw error;
  }
}

export async function deleteAuthor(id: string): Promise<void> {
  try {
    await handleFetch(`${BASE_URL}/authors/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting author ${id}:`, error);
    throw error;
  }
}

// Image Upload
export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}