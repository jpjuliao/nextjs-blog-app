import React, { useState } from 'react';
import { SearchBarProps } from '@/types'

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="border border-gray-300 rounded px-3 py-1 mb-3"
    />
  );
};

export default SearchBar;
