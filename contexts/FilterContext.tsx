import React from 'react';
import BottomDrawer from '../components/common/BottomDrawer';
import FilterList from '../components/common/FilterList';
import FILTER_KEYS from '../constants/FILTER_KEYS';
import JOB_FILTERS from '../constants/JOB_FILTERS';
import PAYMENT_FILTERS from '../constants/PAYMENT_FILTERS';
import PROFILE_REPORT_FILTERS from '../constants/PROFILE_REPORT_FILTERS';

type TSnackBarLoading = {
  children: React.ReactNode;
};

type TFilterContext = {
  showFilter: (filterKey: string) => void;
  hideFilter: () => void;
  filters: Record<string, string[]>;
};

export const FilterContext = React.createContext<TFilterContext | undefined>(
  undefined
);

export default function FilterArea(props: TSnackBarLoading) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [filterObject, setFilterObject] = React.useState<
    Record<string, string[]>
  >({});

  const toggleFilterDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleAppliedFilters = (filters: string[]) => {
    setFilterObject(prev => ({...prev, [key]: filters}));
    setShowDrawer(false);
  };

  const getFilterList = () => {
    switch (key) {
      case FILTER_KEYS.ACTIVE_JOBS:
        return JOB_FILTERS;
      case FILTER_KEYS.EMERGENCY_TASK:
        return JOB_FILTERS;
      case FILTER_KEYS.PAYMENT_HISTORY:
        return PAYMENT_FILTERS;
      case FILTER_KEYS.PROFILE_REPORT:
        return PROFILE_REPORT_FILTERS;

      default:
        return [];
    }
  };

  const data = {
    showFilter: (filterKey: string) => {
      setKey(filterKey);
      setShowDrawer(true);
    },
    hideFilter: () => {
      setShowDrawer(false);
    },
    filters: filterObject,
  };

  return (
    <FilterContext.Provider value={data}>
      {props.children}
      {showDrawer && key ? (
        <BottomDrawer handleClose={toggleFilterDrawer} isOpen={showDrawer}>
          <FilterList
            filters={getFilterList()}
            appliedFilters={filterObject[key] || []}
            setAppliedFilters={handleAppliedFilters}
            setIsOpenFilterDrawer={setShowDrawer}
          />
        </BottomDrawer>
      ) : null}
    </FilterContext.Provider>
  );
}
