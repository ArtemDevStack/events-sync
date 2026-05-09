'use client';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type EventModel, useEventsStore } from '@/app/core/store/eventsStore';

const STATUS_STYLES: Record<EventModel['status'], { label: string; className: string }> = {
	open: { label: 'Регистрация открыта', className: 'bg-emerald-500/10 text-emerald-500' },
	soon: { label: 'Скоро', className: 'bg-amber-500/10 text-amber-500' },
	full: { label: 'Мест нет', className: 'bg-red-500/10 text-red-500' },
	almost: { label: 'Почти заполнено', className: 'bg-amber-500/10 text-amber-500' },
	closed: { label: 'Регистрация закрыта', className: 'bg-slate-500/10 text-slate-500' },
};

export function UpcomingEvents() {
	const router = useRouter();
	const events = useEventsStore((s) => s.events).slice(0, 3);

	return (
		<section className="bg-white py-20">
			<div className="container-1728 flex flex-col gap-10">
				<header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
					<div className="flex flex-col gap-2">
						<h2 className="text-2xl font-bold leading-8 text-slate-800">
							Ближайшие мероприятия
						</h2>
						<p className="text-base font-normal leading-6 text-slate-500">
							Откройте для себя события, которые стоит посетить.
						</p>
					</div>
					<button
						type="button"
						onClick={() => router.push('/catalog')}
						className="rounded-lg bg-indigo-700 px-8 py-4 text-center text-xl font-semibold leading-7 text-white shadow-md transition-colors hover:bg-indigo-800"
					>
						Найти мероприятие
					</button>
				</header>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>

				<button
					type="button"
					onClick={() => router.push('/catalog')}
					className="block w-full rounded-lg bg-indigo-700 px-8 py-4 text-center text-xl font-semibold leading-7 text-white shadow-md transition-colors hover:bg-indigo-800"
				>
					Найти мероприятие
				</button>
			</div>
		</section>
	);
}

function EventCard({ event }: { event: EventModel }) {
	const router = useRouter();
	const status = STATUS_STYLES[event.status];

	return (
		<button
			type="button"
			onClick={() => router.push(`/event/${event.id}`)}
			className="flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200 transition-shadow hover:shadow-lg"
		>
			<div className="relative">
				<img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
			</div>

			<div className="flex flex-1 flex-col p-6">
				<div className="flex items-start justify-between pb-3">
					<span
						className={`rounded-full px-2 py-1 text-xs font-bold leading-3 tracking-wide ${status.className}`}
					>
						{status.label}
					</span>
					<div className="flex flex-col items-end">
						<span className="text-base font-normal leading-6 text-slate-800">
							{event.day}
						</span>
						<span className="text-base font-normal uppercase leading-6 text-slate-500">
							{event.time}
						</span>
					</div>
				</div>

				<h3 className="pb-2 text-xl font-semibold leading-7 text-slate-800">
					{event.title}
				</h3>

				<p className="flex-1 pb-6 text-sm font-normal leading-5 text-slate-500">
					{event.shortDescription}
				</p>

				<div className="flex items-center justify-between border-t border-gray-200 pt-4">
					<div className="flex items-center gap-2">
						<MapPin className="h-4 w-4 text-slate-500" />
						<span className="text-sm font-normal leading-5 text-slate-500">
							{event.location}
						</span>
					</div>
					<span className="text-base font-normal leading-6 text-indigo-700">
						{event.priceShort}
					</span>
				</div>
			</div>
		</button>
	);
}
