import { Footer } from '@/components/ui/Footer';
import { Features } from './components/Features';
import { Hero } from './components/Hero';
import { UpcomingEvents } from './components/UpcomingEvents';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Features />
			<UpcomingEvents />
			<Footer />
		</>
	);
}
