import React, { useEffect, useState } from 'react';
import { useNews } from '../contexts/NewsContext';
import FeaturedSlider from '../components/FeaturedSlider';
import ArticleGrid from '../components/ArticleGrid';
import { Article } from '../types';

const HomePage: React.FC = () => {
  const { getFeaturedArticles, getLatestArticles, getArticlesByCategory } = useNews();
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [techArticles, setTechArticles] = useState<Article[]>([]);
  const [geopoliticsArticles, setGeopoliticsArticles] = useState<Article[]>([]);
  const [programmingArticles, setProgrammingArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const featured = await getFeaturedArticles();
        const latest = await getLatestArticles(6);
        const tech = await getArticlesByCategory('tech', 3);
        const geo = await getArticlesByCategory('geopolitics', 3);
        const prog = await getArticlesByCategory('programming', 3);
        
        setFeaturedArticles(featured);
        setLatestArticles(latest);
        setTechArticles(tech);
        setGeopoliticsArticles(geo);
        setProgrammingArticles(prog);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800"></div>
      </div>
    );
  }

  return (
    <div>
      {featuredArticles.length > 0 && (
        <FeaturedSlider articles={featuredArticles} />
      )}
      
      <ArticleGrid 
        articles={latestArticles} 
        title="Latest News" 
        viewAll="/category/latest" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="section-tech">
          <ArticleGrid 
            articles={techArticles} 
            title="Technology" 
            viewAll="/category/tech" 
          />
        </div>
        
        <div className="section-geo">
          <ArticleGrid 
            articles={geopoliticsArticles} 
            title="Geopolitics" 
            viewAll="/category/geopolitics" 
          />
        </div>
        
        <div className="section-prog">
          <ArticleGrid 
            articles={programmingArticles} 
            title="Programming" 
            viewAll="/category/programming" 
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;