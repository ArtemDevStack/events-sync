import { CreateEventHeader } from './components/CreateEventHeader';

export const metadata = {
	title: 'Создание мероприятия — EventSync',
};

export default function CreateEventLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-slate-50">
			<CreateEventHeader />
			<main className="flex-1">{children}</main>
		</div>
	);
}
