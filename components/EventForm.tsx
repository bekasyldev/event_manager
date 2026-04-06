'use client';

import { Event } from '@/types/event';

interface EventFormProps {
  onSubmit?: (data: Partial<Event>) => void;
  onClose?: () => void;
  defaultValues?: Partial<Event>;
}

const inputClass =
  'w-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function EventForm({
  onSubmit = () => {},
  onClose = () => {},
  defaultValues,
}: EventFormProps) {
  const isEditing = !!defaultValues?.id;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    onSubmit({
      title: data.get('title') as string,
      description: data.get('description') as string,
      date: data.get('date') as string,
      category: data.get('category') as Event['category'],
      status: data.get('status') as Event['status'],
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 id="form-title" className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Event' : 'Add Event'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close form"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className={labelClass}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Event title"
              defaultValue={defaultValues?.title ?? ''}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Optional description…"
              defaultValue={defaultValues?.description ?? ''}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className={labelClass}>
              Date &amp; Time <span className="text-red-400">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              required
              defaultValue={defaultValues?.date ?? ''}
              className={inputClass}
            />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={defaultValues?.category ?? 'Conference'}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={defaultValues?.status ?? 'Planned'}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Planned">Planned</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
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
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              {isEditing ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
