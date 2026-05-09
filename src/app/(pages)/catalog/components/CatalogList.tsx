'use client';

import { useMemo } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEventsStore, filterEvents } from '@/app/core/store/eventsStore';

type StatusKey = 'open' | 'almost' | 'closed';

const STATUS: Record<StatusKey, { label: string; dot: string; text: string; bg: string }> = {
  open: {
    label: 'Регистрация открыта',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  almost: {
    label: 'Мест мало',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  closed: {
    label: 'Регистрация закрыта',
    dot: 'bg-slate-400',
    text: 'text-slate-600',
    bg: 'bg-slate-100',
  },
};

const CATEGORY_STYLE: Record<string, { text: string; bg: string }> = {
  Technology: { text: 'text-indigo-700', bg: 'bg-indigo-50' },
  Design: { text: 'text-purple-700', bg: 'bg-purple-50' },
  Business: { text: 'text-blue-700', bg: 'bg-blue-50' },
};

export function CatalogList() {
  const events = useEventsStore((s) => s.events);
  const filters = useEventsStore((s) => s.filters);
  const featured = useMemo(() => events.find((e) => e.featured), [events]);
  const filtered = useMemo(() => filterEvents(events, filters), [events, filters]);
  const items = featured ? filtered.filter((e) => e.id !== featured.id) : filtered;

  return (
    <div className="flex flex-col gap-6">
      {featured && <FeaturedCard event={featured} />}
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ event }: { event: ReturnType<ReturnType<typeof useEventsStore.getState>['getFeatured']> }) {
  if (!event) return null;
  const status = STATUS[event.status as StatusKey] ?? STATUS.closed;
  const catStyle = CATEGORY_STYLE[event.category] ?? { text: 'text-slate-700', bg: 'bg-slate-50' };
  const router = useRouter();

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_15px_0px_rgba(0,0,0,0.03)] outline outline-1 -outline-offset-1 outline-slate-100 lg:flex-row">
      <div className="relative lg:w-96">
        <img
          src={event.heroImage}
          alt={event.title}
          className="h-64 w-full object-cover lg:h-full"
        />
        <span className="absolute left-4 top-4 rounded bg-white/90 px-2 py-1 text-xs font-bold leading-4 text-indigo-600 backdrop-blur-sm">
          FEATURED
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${catStyle.bg} ${catStyle.text}`}
            >
              {event.category}
            </span>
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${status.bg} ${status.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-8 text-slate-800">
            {event.title}
          </h3>
          <p className="text-sm font-normal leading-5 text-slate-500">
            {event.shortDescription}
          </p>
          <ul className="flex flex-col gap-1.5 pt-2 text-sm leading-5 text-slate-500">
            <li className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              {event.dateRange}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" />
              {event.attendees}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xs font-bold">₽</span>
              {event.priceShort}
            </li>
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push(`/event/${event.slug}`)}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-base font-semibold leading-6 text-white transition-colors hover:bg-indigo-700"
          >
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}

function EventCard({ item }: { item: ReturnType<ReturnType<typeof useEventsStore.getState>['getFilteredEvents']>[number] }) {
  const status = STATUS[item.status as StatusKey] ?? STATUS.closed;
  const catStyle = CATEGORY_STYLE[item.category] ?? { text: 'text-slate-700', bg: 'bg-slate-50' };
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/event/${item.slug}`)}
      className="flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-[0px_4px_15px_0px_rgba(0,0,0,0.03)] outline outline-1 -outline-offset-1 outline-slate-100 transition-shadow hover:shadow-md"
    >
      <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between pb-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${catStyle.bg} ${catStyle.text}`}
          >
            {item.category}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4 ${status.bg} ${status.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <h3 className="pb-2 text-xl font-semibold leading-7 text-slate-800">
          {item.title}
        </h3>

        <ul className="mt-auto flex flex-col gap-2 pt-4 text-sm leading-5 text-slate-500">
          <li className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {item.dateRange}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </li>
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" />
              {item.attendees}
            </span>
            <span className="text-sm font-semibold text-slate-800">{item.priceShort}</span>
          </li>
        </ul>
      </div>
    </button>
  );
}
