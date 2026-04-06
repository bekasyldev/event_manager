'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Event } from '@/types/event';
import { CATEGORIES, STATUSES } from '@/lib/constants';
import { eventSchema, EventFormData } from '@/lib/schemas';

interface EventFormProps {
  onSubmit?: (data: Partial<Event>) => void;
  onClose?: () => void;
  defaultValues?: Partial<Event>;
}

const inputClass =
  'w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200';

const inputErrorClass =
  'w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-red-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function EventForm({
  onSubmit = () => {},
  onClose = () => {},
  defaultValues,
}: EventFormProps) {
  const isEditing = !!defaultValues?.id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      date: defaultValues?.date ?? '',
      category: defaultValues?.category ?? 'Conference',
      status: defaultValues?.status ?? 'Planned',
    },
  });

  function onValid(data: EventFormData) {
    onSubmit(data);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 id="form-title" className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Event' : 'Add Event'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close form"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onValid)} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className={labelClass}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Event title"
              {...register('title')}
              className={errors.title ? inputErrorClass : inputClass}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Optional description…"
              {...register('description')}
              className={`${errors.description ? inputErrorClass : inputClass} resize-none`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              Date &amp; Time <span className="text-red-400">*</span>
            </label>
            <input
              id="date"
              type="datetime-local"
              {...register('date')}
              className={errors.date ? inputErrorClass : inputClass}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                {...register('category')}
                className={`${inputClass} cursor-pointer`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                {...register('status')}
                className={`${inputClass} cursor-pointer`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
