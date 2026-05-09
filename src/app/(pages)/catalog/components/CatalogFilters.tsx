'use client';

import { Filter, RotateCcw } from 'lucide-react';
import { useEventsStore, type EventCategory, type EventFormat } from '@/app/core/store/eventsStore';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { DatePicker } from '@/components/ui/DatePicker';
import { cn } from '@/lib/cn';

const CATEGORIES: EventCategory[] = ['Technology', 'Design', 'Business'];
const FORMATS: (EventFormat | 'All')[] = ['All', 'Online', 'Offline', 'Hybrid'];

const CITY_OPTIONS = [
  { value: 'All Cities', label: 'Все города' },
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  { value: 'Онлайн', label: 'Онлайн' },
];

const FORMAT_OPTIONS = FORMATS.map((f) => ({
  value: f,
  label: f === 'All' ? 'Все форматы' : f,
}));

export function CatalogFilters() {
  const { filters, setFilters, resetFilters } = useEventsStore();

  const toggleCategory = (cat: EventCategory) => {
    setFilters({
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-800" />
          <h2 className="text-xl font-semibold leading-7 text-slate-800">Фильтры</h2>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-indigo-600"
        >
          <RotateCcw className="h-3 w-3" />
          Сбросить
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
          Дата
        </span>
        <DatePicker
          value={filters.date}
          onChange={(date) => setFilters({ date })}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
          Город
        </span>
        <CustomSelect
          options={CITY_OPTIONS}
          value={filters.city}
          onChange={(city) => setFilters({ city })}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
          Категория
        </span>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const checked = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-800"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border transition-colors',
                    checked
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300 bg-white',
                  )}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 6l3 3 5-6" />
                    </svg>
                  )}
                </span>
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
          Формат
        </span>
        <CustomSelect
          options={FORMAT_OPTIONS}
          value={filters.format}
          onChange={(format) => setFilters({ format: format as EventFormat | 'All' })}
        />
      </div>
    </div>
  );
}
