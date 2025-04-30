import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Tag } from 'lucide-react';
import { useNews } from '../contexts/NewsContext';
import ArticleGrid from '../components/ArticleGrid';
import { Article } from '../types';

const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { getArticleBySlug, getRelatedArticles } = useNews();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      try {
        if (articleSlug) {
          const fetchedArticle = await getArticleBySlug(articleSlug);
          setArticle(fetchedArticle);
          
          if (fetchedArticle) {
            const related = await getRelatedArticles(fetchedArticle.id, fetchedArticle.category);
            setRelatedArticles(related);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  useEffect(() => {
    // Update metadata for SEO
    if (article) {
      document.title = article.seoTitle || article.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', article.seoDescription || article.excerpt);
    }
    
    return () => {
      // Reset title when unmounting
      const defaultTitle = document.querySelector('title[data-default]');
      if (defaultTitle) {
        document.title = defaultTitle.textContent || '';
      }
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-neutral-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`section-${article.category.includes('tech') ? 'tech' : article.category.includes('geo') ? 'geo' : article.category.includes('prog') ? 'prog' : article.category.includes('games') ? 'games' : 'default'}`}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="mb-4">
            <Link 
              to={`/category/${article.category}`}
              className="text-sm font-medium hover:underline"
              style={{ color: 'rgb(var(--section-primary))' }}
            >
              {article.category}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-neutral-600 mb-6">{article.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center text-neutral-600 text-sm mb-6">
            <div className="flex items-center mr-6 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center border-t border-b border-neutral-200 py-4 mb-8">
            <Tag className="h-4 w-4 mr-2" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?tag=${tag}`}
                  className="px-3 py-1 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-neutral-200 pt-6 mb-12">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
              
            </div>
            <div>
             
            </div>
          </div>
          <div className="flex space-x-2">
            <Link 
              to={`/author/${article.authorId}`}
              className="btn btn-outline"
            >
              More from this author
            </Link>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <ArticleGrid articles={relatedArticles} title="Related Articles" />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;