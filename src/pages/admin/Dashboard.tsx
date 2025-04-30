import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Users, TrendingUp, Calendar } from 'lucide-react';
import { useNews } from '../../contexts/NewsContext';
import ArticleList from '../../components/admin/ArticleList';
import { Article } from '../../types';

const Dashboard: React.FC = () => {
  const { getAllArticles, deleteArticle, getStats } = useNews();
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    categories: 0,
    recentViews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await getAllArticles();
        const fetchedStats = await getStats();
        
        setArticles(fetchedArticles);
        setStats(fetchedStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/admin/article/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Articles</p>
              <p className="text-2xl font-bold">{stats.totalArticles}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-green-600">{stats.publishedArticles} published</span>
            <span className="text-yellow-600">{stats.draftArticles} drafts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Categories</p>
              <p className="text-2xl font-bold">{stats.categories}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Across different topics
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Recent Views</p>
              <p className="text-2xl font-bold">{stats.recentViews}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Last 7 days
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 mr-4">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Latest Article</p>
              <p className="text-lg font-medium truncate">
                {articles.length > 0 
                  ? new Date(articles[0].publishedAt).toLocaleDateString()
                  : 'No articles yet'}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500 truncate">
            {articles.length > 0 ? articles[0].title : 'Create your first article'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Articles</h2>
        <ArticleList articles={articles} onDelete={handleDeleteArticle} />
      </div>
    </div>
  );
};

export default Dashboard;