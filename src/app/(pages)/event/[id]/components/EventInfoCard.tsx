import { CalendarDays, Clock, MapPin } from 'lucide-react';
import type { EventModel } from '@/app/core/store/eventsStore';

export function EventInfoCard({ event }: { event: EventModel }) {
	const rows = [
		{ icon: CalendarDays, label: 'ДАТА', primary: event.fullDate },
		{ icon: Clock, label: 'ВРЕМЯ', primary: event.timeRange },
		{
			icon: MapPin,
			label: 'МЕСТО',
			primary: event.venue,
			secondary: event.location,
		},
	];

	return (
		<div className="grid gap-4 rounded-xl bg-white p-6 shadow-[0px_4px_15px_-3px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200/50 sm:grid-cols-3 sm:gap-6">
			{rows.map(({ icon: Icon, label, primary, secondary }) => (
				<div key={label} className="flex items-start gap-4">
					<div className="rounded-lg bg-violet-50 p-3">
						<Icon className="h-5 w-5 text-indigo-700" />
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
							{label}
						</span>
						<span className="text-xl font-semibold leading-7 text-slate-800">
							{primary}
						</span>
						{secondary && (
							<span className="text-sm font-normal leading-5 text-slate-500">
								{secondary}
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
