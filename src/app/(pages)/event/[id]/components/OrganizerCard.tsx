import type { EventModel } from '@/app/core/store/eventsStore';

export function OrganizerCard({ event }: { event: EventModel }) {
	const { name, rating, initial } = event.organizer;
	return (
		<div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200">
			<h3 className="text-xl font-semibold leading-7 text-slate-800">Организатор</h3>

			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 outline outline-1 -outline-offset-1 outline-indigo-100">
					<span className="text-xl font-bold leading-7 text-indigo-700">{initial}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-base font-semibold leading-6 text-slate-800">{name}</span>
					<span className="text-sm font-normal leading-5 text-slate-500">
						Рейтинг: {rating}
					</span>
				</div>
			</div>

			<button
				type="button"
				className="self-start text-sm font-medium leading-5 text-indigo-700 transition-colors hover:text-indigo-900"
			>
				Связаться с организатором →
			</button>
		</div>
	);
}
