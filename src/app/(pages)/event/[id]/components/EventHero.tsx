import type { EventModel } from '@/app/core/store/eventsStore';

const STATUS_BADGE: Record<EventModel['status'], { label: string; className: string }> = {
	open: {
		label: 'РЕГИСТРАЦИЯ ОТКРЫТА',
		className:
			'bg-emerald-500/20 text-emerald-400 outline outline-1 -outline-offset-1 outline-emerald-500/30',
	},
	soon: {
		label: 'СКОРО',
		className:
			'bg-amber-500/20 text-amber-300 outline outline-1 -outline-offset-1 outline-amber-500/30',
	},
	full: {
		label: 'МЕСТ НЕТ',
		className:
			'bg-red-500/20 text-red-300 outline outline-1 -outline-offset-1 outline-red-500/30',
	},
	almost: {
		label: 'ПОЧТИ ЗАПОЛНЕНО',
		className:
			'bg-amber-500/20 text-amber-300 outline outline-1 -outline-offset-1 outline-amber-500/30',
	},
	closed: {
		label: 'РЕГИСТРАЦИЯ ЗАКРЫТА',
		className:
			'bg-slate-500/40 text-slate-100 outline outline-1 -outline-offset-1 outline-slate-300/30',
	},
};

const FORMAT_LABEL: Record<EventModel['format'], string> = {
	Online: 'ОНЛАЙН',
	Offline: 'ОФЛАЙН',
	Hybrid: 'ГИБРИД',
};

export function EventHero({ event }: { event: EventModel }) {
	const badge = STATUS_BADGE[event.status];

	return (
		<div className="flex flex-col gap-6">
			<div className="relative h-72 overflow-hidden rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:h-96">
				<img
					src={event.heroImage}
					alt={event.title}
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/0 to-black/0" />
				<div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
					<span
						className={`rounded-full px-3 py-1 text-xs font-bold leading-3 tracking-wide backdrop-blur-md ${badge.className}`}
					>
						{badge.label}
					</span>
					<span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold leading-3 tracking-wide text-white outline outline-1 -outline-offset-1 outline-white/30 backdrop-blur-md">
						{FORMAT_LABEL[event.format]}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-extrabold leading-tight text-slate-800 sm:text-5xl sm:leading-[57.6px]">
					{event.title}
				</h1>
				<p className="max-w-3xl text-lg font-normal leading-7 text-slate-500">
					{event.shortDescription}
				</p>
			</div>
		</div>
	);
}
