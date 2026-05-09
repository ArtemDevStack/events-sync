import { MapPin } from 'lucide-react';
import type { EventModel } from '@/app/core/store/eventsStore';

export function VenueCard({ event }: { event: EventModel }) {
	return (
		<div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200">
			<div className="flex items-center gap-2 border-b border-gray-200/50 p-4">
				<MapPin className="h-3.5 w-3.5 text-slate-500" />
				<h3 className="text-base font-semibold leading-6 text-slate-800">Как добраться</h3>
			</div>

			<div className="h-48 bg-gray-200">
				<img
					src={event.mapImage}
					alt="Карта"
					className="h-full w-full object-cover"
				/>
			</div>

			<div className="bg-violet-50/50 px-4 py-4">
				<p className="text-sm font-normal leading-5 text-slate-500">{event.venueAddress}</p>
			</div>
		</div>
	);
}
