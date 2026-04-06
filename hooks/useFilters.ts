import { useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs';
import { CATEGORIES, STATUSES } from '@/lib/constants';
export const sortOptions = ['date-asc', 'date-desc', 'title-asc', 'title-desc'] as const;
export type SortOption = (typeof sortOptions)[number];

export function useFilters() {
  return useQueryStates({
    search: parseAsString.withDefault(''),
    category: parseAsStringLiteral(CATEGORIES),
    status: parseAsStringLiteral(STATUSES),
    sort: parseAsStringLiteral(sortOptions).withDefault('date-asc'),
  });
}
