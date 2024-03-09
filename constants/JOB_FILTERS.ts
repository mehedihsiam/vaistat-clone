import {TFilter} from '../types/filter';

const JOB_FILTERS: TFilter[] = [
  {
    label: 'Morning deliveries (8-12pm)',
    value: 'morning',
  },
  {
    label: 'Afternoon deliveries (12-18h)',
    value: 'afternoon',
  },
  {
    label: 'Evening deliveries (18-12am)',
    value: 'evening',
  },
  {
    label: 'Deliveries',
    value: 'deliveries',
  },
  {
    label: 'Pickups',
    value: 'pickups',
  },
  {
    label: 'Safe drops',
    value: 'safe_drops',
  },
];

export default JOB_FILTERS;
