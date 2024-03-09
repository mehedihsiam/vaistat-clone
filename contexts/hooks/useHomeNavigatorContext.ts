import {useContext} from 'react';
import {
  HomeNavigatorContext,
  HomeNavigatorDispatchContext,
} from '../HomeNavigatorContext';

export const useHomeNavigatorContext = () => useContext(HomeNavigatorContext);

export const useHomeNavigatorContextDispatch = () =>
  useContext(HomeNavigatorDispatchContext);
