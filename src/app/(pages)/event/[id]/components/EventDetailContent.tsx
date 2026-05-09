'use client';

import { ArrowLeft } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { useEventsStore } from '@/app/core/store/eventsStore';
import { EventAbout } from './EventAbout';
import { EventConditions } from './EventConditions';
import { EventHero } from './EventHero';
import { EventInfoCard } from './EventInfoCard';
import { EventProgram } from './EventProgram';
import { OrganizerCard } from './OrganizerCard';
import { TicketCard } from './TicketCard';
import { VenueCard } from './VenueCard';
import { WeatherCard } from './WeatherCard';

export function EventDetailContent({ id }: { id: string }) {
	const router = useRouter();
	const event = useEventsStore((s) => s.getEventById(id));

	if (!event) {
		notFound();
	}

	return (
		<section className="bg-slate-50 py-8 lg:py-12">
			<div className="container-1728 flex flex-col gap-8">
				<button
					type="button"
					onClick={() => router.push('/catalog')}
					className="inline-flex items-center gap-2 text-sm font-normal leading-5 text-slate-500 transition-colors hover:text-slate-800"
				>
					<ArrowLeft className="h-3.5 w-3.5" />К списку мероприятий
				</button>

				<EventHero event={event} />

				<div className="grid gap-10 lg:grid-cols-[1fr_360px]">
					<div className="flex flex-col gap-10">
						<EventInfoCard event={event} />
						<EventAbout event={event} />
						<EventProgram event={event} />
						<EventConditions event={event} />
					</div>

					<aside className="flex flex-col gap-6">
						<TicketCard event={event} />
						<OrganizerCard event={event} />
						<VenueCard event={event} />
						<WeatherCard event={event} />
					</aside>
				</div>
			</div>
		</section>
	);
}
