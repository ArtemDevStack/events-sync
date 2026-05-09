'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const selectedDay = value ? parseInt(value.split('-')[2], 10) : null;
  const selectedMonth = value ? parseInt(value.split('-')[1], 10) - 1 : null;
  const selectedYear = value ? parseInt(value.split('-')[0], 10) : null;

  function selectDay(day: number) {
    const str = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(str);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 transition-colors focus:border-indigo-600 focus:outline-none',
          value ? 'text-slate-800' : 'text-slate-400'
        )}
      >
        <span>{value ? formatDate(value) : 'Выберите дату'}</span>
        <Calendar className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-64 rounded-md border border-slate-200 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="rounded p-1 text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-slate-800">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="rounded p-1 text-slate-500 hover:bg-slate-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
              <span key={d} className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) {
                return <span key={idx} className="h-8" />;
              }
              const isSelected = selectedYear === year && selectedMonth === month && selectedDay === day;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={cn(
                    'h-8 rounded text-sm leading-none transition-colors',
                    isSelected
                      ? 'bg-indigo-600 font-medium text-white'
                      : isToday
                        ? 'font-semibold text-indigo-600 hover:bg-indigo-50'
                        : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`;
}
