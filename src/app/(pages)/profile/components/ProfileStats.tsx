import { CalendarDays, CheckCircle2, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

type Stat = {
	icon: LucideIcon;
	iconBg: string;
	iconColor: string;
	label: string;
	value: string;
	badge?: ReactNode;
};

const STATS: Stat[] = [
	{
		icon: CalendarDays,
		iconBg: 'bg-indigo-600/10',
		iconColor: 'text-indigo-700',
		label: 'Всего мероприятий',
		value: '48',
		badge: <Trend value="+12%" />,
	},
	{
		icon: CheckCircle2,
		iconBg: 'bg-emerald-500/10',
		iconColor: 'text-emerald-500',
		label: 'Активные (Открыта регистрация)',
		value: '12',
	},
	{
		icon: Users,
		iconBg: 'bg-violet-800/10',
		iconColor: 'text-violet-800',
		label: 'Всего участников',
		value: '8,402',
		badge: (
			<span className="rounded-md bg-violet-100 px-2 py-1 text-sm font-normal leading-5 text-slate-500">
				В этом месяце
			</span>
		),
	},
];

export function ProfileStats() {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{STATS.map(({ icon, iconBg, iconColor, label, value, badge }) => (
				<StatCard
					key={label}
					icon={icon}
					iconBg={iconBg}
					iconColor={iconColor}
					label={label}
					value={value}
					badge={badge}
				/>
			))}
		</div>
	);
}

function StatCard({
	icon: Icon,
	iconBg,
	iconColor,
	label,
	value,
	badge,
}: {
	icon: ComponentType<{ className?: string }>;
	iconBg: string;
	iconColor: string;
	label: string;
	value: string;
	badge?: ReactNode;
}) {
	return (
		<article className="flex flex-col justify-between gap-6 rounded-xl bg-white p-6 shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-slate-300/20">
			<div className="flex items-start justify-between">
				<div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
					<Icon className={`h-5 w-5 ${iconColor}`} />
				</div>
				{badge}
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-sm font-normal leading-5 text-slate-500">{label}</span>
				<span className="text-5xl font-extrabold leading-[48px] text-slate-800">{value}</span>
			</div>
		</article>
	);
}

function Trend({ value }: { value: string }) {
	return (
		<span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-sm font-normal leading-5 text-emerald-500">
			<TrendingUp className="h-3 w-3" />
			{value}
		</span>
	);
}
