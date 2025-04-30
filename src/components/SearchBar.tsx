import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10"
          autoFocus
        />
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 p-2 rounded-full hover:bg-neutral-100"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <button
        type="submit"
        className="ml-2 btn btn-primary"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;