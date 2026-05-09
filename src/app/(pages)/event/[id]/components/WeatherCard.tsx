import { Cloud } from 'lucide-react';
import type { EventModel } from '@/app/core/store/eventsStore';

export function WeatherCard({ event }: { event: EventModel }) {
	return (
		<div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200">
			<div className="flex flex-col gap-1">
				<span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
					Погода в день мероприятия
				</span>
				<span className="text-xl font-semibold leading-7 text-slate-800">
					{event.weather.description}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Cloud className="h-7 w-7 text-slate-500" />
				<span className="text-3xl font-bold leading-10 text-slate-800">{event.weather.temperature}</span>
			</div>
		</div>
	);
}
