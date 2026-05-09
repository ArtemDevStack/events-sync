'use client';

import { Download, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileEvents } from './ProfileEvents';
import { ProfileStats } from './ProfileStats';

export function ProfileContent() {
	const router = useRouter();
	return (
		<section className="bg-slate-50 py-8 lg:py-12">
			<div className="container-1728 flex flex-col gap-8">
				<header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl font-bold leading-10 text-slate-800">
							Панель управления
						</h1>
						<p className="text-base font-normal leading-6 text-slate-500">
							Добро пожаловать. Вот сводка по вашим мероприятиям.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<button
							type="button"
							className="flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-normal leading-5 text-zinc-900 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-slate-300"
						>
							<Download className="h-3.5 w-3.5" />
							Экспорт
						</button>
						<button
							type="button"
							onClick={() => router.push('/create-event')}
							className="flex items-center gap-2 rounded-lg bg-indigo-700 px-6 py-2 text-sm font-normal leading-5 text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] transition-colors hover:bg-indigo-800"
						>
							<Plus className="h-3.5 w-3.5" />
							Создать мероприятие
						</button>
					</div>
				</header>

				<ProfileStats />

				<ProfileEvents />
			</div>
		</section>
	);
}
