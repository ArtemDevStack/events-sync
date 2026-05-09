import { BarChart3, CalendarRange, LayoutDashboard, Users, type LucideIcon } from 'lucide-react';

type Feature = {
	icon: LucideIcon;
	title: string;
	description: string;
	iconBg: string;
	iconColor: string;
};

const FEATURES: Feature[] = [
	{
		icon: LayoutDashboard,
		title: 'Интуитивный Дашборд',
		description:
			'Управляйте расписанием, билетами и аналитикой из одного центрального интерфейса, разработанного для максимальной эффективности.',
		iconBg: 'bg-indigo-600/10',
		iconColor: 'text-indigo-600',
	},
	{
		icon: Users,
		title: 'Управление участниками',
		description:
			'Легко отслеживайте регистрации и взаимодействуйте с аудиторией.',
		iconBg: 'bg-violet-600/10',
		iconColor: 'text-violet-600',
	},
	{
		icon: BarChart3,
		title: 'Глубокая Аналитика',
		description:
			'Получайте инсайты о посещаемости и вовлеченности в реальном времени.',
		iconBg: 'bg-emerald-500/10',
		iconColor: 'text-emerald-500',
	},
	{
		icon: CalendarRange,
		title: 'Гибкое Планирование',
		description:
			'Настраивайте сложные расписания многодневных мероприятий с параллельными сессиями без лишних усилий.',
		iconBg: 'bg-cyan-300/20',
		iconColor: 'text-cyan-600',
	},
];

export function Features() {
	return (
		<section className="bg-slate-50 py-20">
			<div className="container-1728 flex flex-col items-center gap-12">
				<header className="flex max-w-2xl flex-col items-center gap-4 text-center">
					<h2 className="text-2xl font-bold leading-8 text-slate-800">
						Почему выбирают EventSync?
					</h2>
					<p className="text-base font-normal leading-6 text-slate-500">
						Инструменты, созданные для профессионалов, но понятные каждому.
					</p>
				</header>

				<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{FEATURES.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
						<article
							key={title}
							className="flex flex-col items-start gap-3 rounded-xl bg-white p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200 transition-shadow hover:shadow-md"
						>
							<div className={`rounded-lg p-3 ${iconBg}`}>
								<Icon className={`h-7 w-7 ${iconColor}`} />
							</div>
							<h3 className="text-xl font-semibold leading-7 text-slate-800">
								{title}
							</h3>
							<p className="text-base font-normal leading-6 text-slate-500">
								{description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
