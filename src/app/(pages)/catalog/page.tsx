import { Footer } from '@/components/ui/Footer';
import { CatalogContent } from './components/CatalogContent';

export const metadata = {
	title: 'Мероприятия — EventSync',
	description: 'Каталог мероприятий: фильтрация по дате, городу, категории и формату.',
};

export default function CatalogPage() {
	return (
		<>
			<CatalogContent />
			<Footer />
		</>
	);
}
