import { useLocation } from 'react-router-dom';

// Map categories to their respective color classes
const CategoryColors = {
  tech: 'section-tech',
  ai: 'section-tech',
  gadgets: 'section-tech',
  internet: 'section-tech',
  
  geopolitics: 'section-geo',
  'global-market': 'section-geo',
  conflicts: 'section-geo',
  diplomacy: 'section-geo',
  
  programming: 'section-prog',
  web: 'section-prog',
  mobile: 'section-prog',
  devops: 'section-prog',
  
  games: 'section-games',
  console: 'section-games',
  pc: 'section-games',
  'mobile-gaming': 'section-games',
  
  default: ''
};

// Helper function to get the appropriate color class based on current path
export const useCategoryColor = () => {
  const location = useLocation();
  const path = location.pathname;
  
  for (const [category, colorClass] of Object.entries(CategoryColors)) {
    if (path.includes(`/category/${category}`)) {
      return colorClass;
    }
  }
  
  return 'default';
};

export default CategoryColors;