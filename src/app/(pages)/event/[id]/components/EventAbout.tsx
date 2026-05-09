import type { EventModel } from '@/app/core/store/eventsStore';

export function EventAbout({ event }: { event: EventModel }) {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold leading-8 text-slate-800">О мероприятии</h2>
			{event.longDescription.map((paragraph, idx) => (
				<p key={idx} className="text-base font-normal leading-6 text-slate-500">
					{paragraph}
				</p>
			))}
		</section>
	);
}
