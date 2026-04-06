import { z } from 'zod';
import { CATEGORIES, STATUSES } from '@/lib/constants';

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be under 100 characters'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  date: z.string().min(1, 'Date is required'),
  category: z.enum(CATEGORIES),
  status: z.enum(STATUSES),
});

export type EventFormData = z.infer<typeof eventSchema>;
