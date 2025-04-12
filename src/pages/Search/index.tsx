import { AutoComplete } from '@components/AutoComplete';
import { ROUTE_PATHS } from '@constants';
import React from 'react';
import { Link } from 'react-router-dom';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];
const Search = () => {
  const handleSelect = (option: { label: string; value: string }) => {
    console.log('Selected:', option);
  };
  return (
    <div>
      <AutoComplete options={options} onSelect={handleSelect} />
      <Link to={ROUTE_PATHS.HOME}>HOME</Link>
    </div>
  );
};

export default Search;
