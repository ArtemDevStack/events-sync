import { Footer } from '@/components/ui/Footer';
import { EventDetailContent } from './components/EventDetailContent';

export const metadata = {
	title: 'Мероприятие — EventSync',
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<>
			<EventDetailContent id={id} />
			<Footer />
		</>
	);
}
