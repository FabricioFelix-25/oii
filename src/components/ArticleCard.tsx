import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card group">
      <Link to={`/article/${article.slug}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center text-sm mb-2">
          <Link 
            to={`/category/${article.category}`}
            className="font-medium"
            style={{ color: 'rgb(var(--section-primary))' }}
          >
            {article.category}
          </Link>
          <span className="mx-2">•</span>
          <span className="flex items-center text-neutral-500">
            <Clock className="h-3 w-3 mr-1" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          <Link to={`/article/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="text-neutral-600 line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{article.author.name}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;