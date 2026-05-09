import { Footer } from '@/components/ui/Footer';
import { EventDetailContent } from './components/EventDetailContent';
import { EVENTS } from '@/app/core/store/eventsStore';

export const metadata = {
	title: 'Мероприятие — EventSync',
};

export function generateStaticParams() {
	return EVENTS.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<>
			<EventDetailContent id={id} />
			<Footer />
		</>
	);
}
