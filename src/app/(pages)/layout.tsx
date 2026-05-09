import { Header } from '@/components/ui/Header';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="bg-slate-50">{children}</main>
		</>
	);
}
