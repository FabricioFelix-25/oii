import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../contexts/NewsContext';
import ArticleGrid from '../components/ArticleGrid';
import ArticleFilter from '../components/ArticleFilter';
import { Article } from '../types';
import { 
  Gamepad, Trophy, Flame,
  Cpu, Wifi, Globe,
  Code, Terminal, GitBranch,
  Map, Globe2, BarChart3
} from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { getArticlesByCategory, getAuthors } = useNews();
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        if (categorySlug) {
          const fetchedArticles = await getArticlesByCategory(categorySlug);
          const authorList = await getAuthors();
          
          setArticles(fetchedArticles);
          setAuthors(authorList);
          
          const title = categorySlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          setCategoryTitle(title);
        }
      } catch (error) {
        console.error('Error fetching category articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [categorySlug]);

  const handleFilter = async (filters: { category?: string; author?: string; date?: string }) => {
    setIsLoading(true);
    try {
      let filteredArticles = await getArticlesByCategory(categorySlug || '');
      
      if (filters.author) {
        filteredArticles = filteredArticles.filter(article => 
          article.author.name === filters.author
        );
      }
      
      if (filters.date) {
        const now = new Date();
        let fromDate = new Date();
        
        if (filters.date === 'today') {
          fromDate.setHours(0, 0, 0, 0);
        } else if (filters.date === 'week') {
          fromDate.setDate(now.getDate() - 7);
        } else if (filters.date === 'month') {
          fromDate.setMonth(now.getMonth() - 1);
        } else if (filters.date === 'year') {
          fromDate.setFullYear(now.getFullYear() - 1);
        }
        
        filteredArticles = filteredArticles.filter(article => 
          new Date(article.publishedAt) >= fromDate
        );
      }
      
      setArticles(filteredArticles);
    } catch (error) {
      console.error('Error filtering articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800"></div>
      </div>
    );
  }

  const getCategoryContent = () => {
    if (categorySlug?.includes('games')) {
      return (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Gamepad className="h-10 w-10 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              {categoryTitle}
            </h1>
            <Gamepad className="h-10 w-10 text-purple-500" />
          </div>
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span className="text-lg">Latest Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-red-500" />
              <span className="text-lg">Trending Games</span>
            </div>
          </div>
          <p className="text-neutral-600 text-lg">
            Your source for the latest gaming news, reviews, and trending titles!
          </p>
        </>
      );
    }

    if (categorySlug?.includes('tech')) {
      return (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Cpu className="h-10 w-10 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold">{categoryTitle}</h1>
            <Wifi className="h-10 w-10 text-cyan-500" />
          </div>
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-blue-500" />
              <span className="text-lg">Innovation Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-cyan-500" />
              <span className="text-lg">Tech Reviews</span>
            </div>
          </div>
          <p className="text-neutral-600 text-lg">
            Exploring the future of technology and innovation
          </p>
        </>
      );
    }

    if (categorySlug?.includes('programming')) {
      return (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Code className="h-10 w-10 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold font-mono">{categoryTitle}</h1>
            <Terminal className="h-10 w-10 text-emerald-500" />
          </div>
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-mono">Latest Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-emerald-500" />
              <span className="text-lg font-mono">Code Examples</span>
            </div>
          </div>
          <p className="text-neutral-600 text-lg font-mono">
            {'<div>Coding the future, one line at a time</div>'}
          </p>
        </>
      );
    }

    if (categorySlug?.includes('geopolitics')) {
      return (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <Globe2 className="h-10 w-10 text-amber-700" />
            <h1 className="text-4xl md:text-5xl font-bold font-serif">{categoryTitle}</h1>
            <Map className="h-10 w-10 text-amber-900" />
          </div>
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-amber-700" />
              <span className="text-lg font-serif">Global Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-6 w-6 text-amber-900" />
              <span className="text-lg font-serif">World Affairs</span>
            </div>
          </div>
          <p className="text-neutral-600 text-lg font-serif">
            Understanding the complex dynamics of global politics and economics
          </p>
        </>
      );
    }

    return (
      <>
        <h1 className="text-3xl md:text-4xl font-bold">{categoryTitle}</h1>
        <p className="text-neutral-600 mt-2">
          Latest articles on {categoryTitle.toLowerCase()}.
        </p>
      </>
    );
  };

  return (
    <div>
      <header className={`mb-8 ${categorySlug?.includes('tech') || categorySlug?.includes('games') || categorySlug?.includes('programming') || categorySlug?.includes('geopolitics') ? 'text-center' : ''}`}>
        {getCategoryContent()}
      </header>
      
      <ArticleFilter 
        categories={[categorySlug || '']} 
        authors={authors} 
        onFilter={handleFilter} 
      />
      
      {articles.length > 0 ? (
        <ArticleGrid articles={articles} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-neutral-600">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;