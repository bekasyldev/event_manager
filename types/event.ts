export type Category = 'Conference' | 'Webinar' | 'Meeting';

export type Status = 'Planned' | 'Completed';

export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  category: Category;
  status: Status;
  isFavorite?: boolean;
}
