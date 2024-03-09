import {useContext} from 'react';
import {FilterContext} from '../FilterContext';

const useFilterContext = () => {
  const context = useContext(FilterContext);
  return context;
};

export default useFilterContext;
