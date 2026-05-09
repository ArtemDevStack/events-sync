'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type Option = { value: string; label: string };

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({ options, value, onChange, placeholder = 'Выберите...', className }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 transition-colors focus:border-indigo-600 focus:outline-none',
          selected ? 'text-slate-800' : 'text-slate-400'
        )}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-slate-400 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                'block w-full px-3 py-2 text-left text-sm leading-5 transition-colors hover:bg-indigo-50',
                opt.value === value ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-800'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
