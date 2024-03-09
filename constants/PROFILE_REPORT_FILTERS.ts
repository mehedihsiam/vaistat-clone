import {TFilter} from '../types/filter';

const PROFILE_REPORT_FILTERS: TFilter[] = [
  {
    label: 'Annual income summary',
    value: 'annual_income',
  },
  {
    label: 'Private delivery distance summary',
    value: 'private_delivery_distance',
  },
  {
    label: 'Public delivery distance summary',
    value: 'public_delivery_distance',
  },
  {
    label: 'Tips summary',
    value: 'tips',
  },
  {
    label: 'Pending delivery summary',
    value: 'pending_delivery',
  },
  {
    label: 'Completed delivery summary',
    value: 'completed_delivery',
  },
];

export default PROFILE_REPORT_FILTERS;
