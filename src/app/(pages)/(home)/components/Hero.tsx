'use client';

import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
	const router = useRouter();

	return (
		<section className="relative overflow-hidden border-b border-gray-200 bg-white">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-gradient-to-b from-indigo-600/10 to-indigo-600/0"
			/>

			<div className="container-1728 relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-32">
				<div className="flex flex-col items-start gap-6">
					<h1 className="text-4xl font-extrabold leading-tight text-slate-800 sm:text-5xl sm:leading-[57.6px]">
						Организуйте и находите
						<br className="hidden sm:block" /> публичные мероприятия
						<br className="hidden sm:block" /> в одном месте
					</h1>

					<p className="max-w-xl text-lg font-normal leading-7 text-slate-500">
						EventSync — это современная платформа для создания, управления и поиска
						событий любого масштаба. От локальных митапов до крупных конференций.
					</p>

					<div className="flex flex-col gap-4 pt-4 sm:flex-row">
						<button
							type="button"
							onClick={() => router.push('/catalog')}
							className="rounded-lg bg-indigo-700 px-8 py-4 text-center text-xl font-semibold leading-7 text-white shadow-md transition-colors hover:bg-indigo-800"
						>
							Найти мероприятие
						</button>
						<button
							type="button"
							onClick={() => router.push('/create-event')}
							className="rounded-lg bg-white px-8 py-4 text-center text-xl font-semibold leading-7 text-indigo-700 outline outline-1 -outline-offset-1 outline-indigo-700/20 transition-colors hover:bg-indigo-50"
						>
							Создать мероприятие
						</button>
					</div>
				</div>

				<div className="relative">
					<div className="overflow-hidden rounded-xl shadow-2xl">
						<img
							src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=592&h=444&fit=crop"
							alt="EventSync дашборд"
							className="h-96 w-full object-cover"
						/>
					</div>

					<div className="absolute -bottom-10 -left-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow-xl outline outline-1 -outline-offset-1 outline-gray-200">
						<div className="rounded-full bg-emerald-500/10 p-3">
							<CheckCircle2 className="h-5 w-5 text-emerald-500" />
						</div>
						<div className="flex flex-col">
							<span className="text-xs font-bold uppercase leading-3 tracking-wide text-slate-500">
								Успешных регистраций
							</span>
							<span className="text-2xl font-bold leading-8 text-slate-800">
								10,000+
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
