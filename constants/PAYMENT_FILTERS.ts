import {TFilter} from '../types/filter';
import JOB_FILTERS from './JOB_FILTERS';

const PAYMENT_FILTERS: TFilter[] = [
  ...JOB_FILTERS,
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Unpaid',
    value: 'unpaid',
  },
];

export default PAYMENT_FILTERS;
