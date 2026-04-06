import { useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs';
import { Category, Status } from '@/types/event';

const categories = ['Conference', 'Webinar', 'Meeting'] as const satisfies readonly Category[];
const statuses = ['Planned', 'Completed'] as const satisfies readonly Status[];
export const sortOptions = ['date-asc', 'date-desc', 'title-asc', 'title-desc'] as const;
export type SortOption = (typeof sortOptions)[number];

export function useFilters() {
  return useQueryStates({
    search: parseAsString.withDefault(''),
    category: parseAsStringLiteral(categories),
    status: parseAsStringLiteral(statuses),
    sort: parseAsStringLiteral(sortOptions).withDefault('date-asc'),
  });
}
