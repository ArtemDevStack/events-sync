import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/assets/styles/globals.css';

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-manrope',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'EventSync — платформа для организации мероприятий',
	description:
		'Современная платформа для создания, управления и поиска событий любого масштаба.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" className={manrope.variable}>
			<body>{children}</body>
		</html>
	);
}
