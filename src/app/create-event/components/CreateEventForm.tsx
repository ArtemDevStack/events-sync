'use client';

import { useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Mic, Users, Wrench, MapPin, CreditCard, CheckCircle2, Globe, Building2, Monitor } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useEventsStore, type EventModel, type EventCategory, type EventFormat } from '@/app/core/store/eventsStore';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { DatePicker } from '@/components/ui/DatePicker';
import { CreateEventStepper } from './CreateEventStepper';

const CATEGORIES: { id: EventCategory; label: string; icon: ComponentType<{ className?: string }> }[] = [
	{ id: 'Technology', label: 'Технологии', icon: Mic },
	{ id: 'Design', label: 'Дизайн', icon: Wrench },
	{ id: 'Business', label: 'Бизнес', icon: Users },
];

const FORMATS: { id: EventFormat; label: string; icon: ComponentType<{ className?: string }> }[] = [
	{ id: 'Offline', label: 'Офлайн', icon: Building2 },
	{ id: 'Online', label: 'Онлайн', icon: Monitor },
	{ id: 'Hybrid', label: 'Гибрид', icon: Globe },
];

const CITIES = ['Москва', 'Санкт-Петербург', 'Онлайн'];

const step1Schema = z.object({
	title: z.string().min(5, 'Минимум 5 символов').max(100, 'Максимум 100 символов'),
	category: z.enum(['Technology', 'Design', 'Business']),
	shortDescription: z.string().min(10, 'Минимум 10 символов').max(500, 'Максимум 500 символов'),
});

const step2Schema = z.object({
	dateISO: z.string().min(1, 'Выберите дату'),
	city: z.string().min(1, 'Выберите город'),
	location: z.string().min(3, 'Минимум 3 символа'),
	format: z.enum(['Offline', 'Online', 'Hybrid']),
});

const step3Schema = z.object({
	attendees: z.string().min(1, 'Укажите количество участников'),
	price: z.string().min(1, 'Укажите цену'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

type FormData = Step1Data & Step2Data & Step3Data;

const INITIAL_DATA: FormData = {
	title: '',
	category: 'Technology',
	shortDescription: '',
	dateISO: '',
	city: 'Москва',
	location: '',
	format: 'Offline',
	attendees: '',
	price: '',
};

export function CreateEventForm() {
	const router = useRouter();
	const addEvent = useEventsStore((s) => s.addEvent);
	const [step, setStep] = useState(1);
	const [data, setData] = useState<FormData>(INITIAL_DATA);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitted, setSubmitted] = useState(false);

	function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
		setData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => {
			const next = { ...prev };
			delete next[field];
			return next;
		});
	}

	function validateStep(current: number): boolean {
		let result;
		if (current === 1) result = step1Schema.safeParse(data);
		else if (current === 2) result = step2Schema.safeParse(data);
		else if (current === 3) result = step3Schema.safeParse(data);
		else return true;

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.issues.forEach((e) => {
				fieldErrors[String(e.path[0])] = e.message;
			});
			setErrors(fieldErrors);
			return false;
		}
		setErrors({});
		return true;
	}

	function nextStep() {
		if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
	}

	function prevStep() {
		setStep((s) => Math.max(s - 1, 1));
	}

	function handleSubmit() {
		if (!validateStep(3)) return;

		const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
		const newEvent: EventModel = {
			id: slug,
			slug,
			title: data.title,
			shortDescription: data.shortDescription,
			longDescription: [data.shortDescription],
			image: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop`,
			heroImage: `https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1232&h=400&fit=crop`,
			mapImage: `https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=377&h=200&fit=crop`,
			category: data.category,
			status: 'open',
			featured: false,
			format: data.format,
			day: new Date(data.dateISO).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
			time: '10:00',
			dateRange: new Date(data.dateISO).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
			dateISO: data.dateISO,
			fullDate: new Date(data.dateISO).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
			timeRange: '10:00 - 18:00',
			city: data.city,
			location: data.location,
			venue: data.location,
			venueAddress: data.location,
			attendees: data.attendees,
			price: data.price,
			priceShort: data.price,
			organizer: { name: 'Вы', rating: '5.0/5', initial: 'В' },
			weather: { description: '—', temperature: '—' },
			program: [],
			conditions: [],
		};

		addEvent(newEvent);
		setSubmitted(true);
		setTimeout(() => router.push(`/event/${slug}`), 1500);
	}

	if (submitted) {
		return (
			<div className="flex flex-col items-center gap-4 rounded-xl bg-white p-12 shadow-[0px_15px_30px_-15px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-gray-200 text-center">
				<CheckCircle2 className="h-16 w-16 text-emerald-500" />
				<h2 className="text-2xl font-bold text-slate-800">Мероприятие создано!</h2>
				<p className="text-slate-500">Перенаправляем на страницу мероприятия...</p>
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-2xl flex-col gap-8">
			<CreateEventStepper currentStep={step} />
			<div className="flex flex-col gap-8 overflow-hidden rounded-xl bg-white p-6 shadow-[0px_15px_30px_-15px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-gray-200">
				{step === 1 && (
					<Step1 data={data} errors={errors} onChange={updateField} />
				)}
				{step === 2 && (
					<Step2 data={data} errors={errors} onChange={updateField} />
				)}
				{step === 3 && (
					<Step3 data={data} errors={errors} onChange={updateField} />
				)}
				{step === 4 && (
					<Step4 data={data} />
				)}

				<footer className="flex flex-col-reverse items-stretch justify-end gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
					{step > 1 && (
						<button
							type="button"
							onClick={prevStep}
							className="flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-medium leading-6 text-slate-500 transition-colors hover:bg-slate-100"
						>
							<ArrowLeft className="h-3.5 w-3.5" />
							Назад
						</button>
					)}
					{step < 4 ? (
						<button
							type="button"
							onClick={nextStep}
							className="flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 py-2.5 text-base font-bold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-800"
						>
							Далее
							<ArrowRight className="h-3.5 w-3.5" />
						</button>
					) : (
						<button
							type="button"
							onClick={handleSubmit}
							className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-base font-bold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-emerald-700"
						>
							<CheckCircle2 className="h-4 w-4" />
							Опубликовать
						</button>
					)}
				</footer>
			</div>
		</div>
	);
}

/* ─── Step 1: Основная информация ─── */
function Step1({ data, errors, onChange }: { data: FormData; errors: Record<string, string>; onChange: <K extends keyof FormData>(f: K, v: FormData[K]) => void }) {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold leading-8 text-slate-800">Основная информация</h2>
				<p className="text-sm text-slate-500">Заполните базовые данные о вашем мероприятии.</p>
			</header>

			<InputField
				label="Название мероприятия"
				value={data.title}
				onChange={(v) => onChange('title', v)}
				error={errors.title}
				placeholder="Например, Global Tech Summit 2025"
			/>

			<div className="flex flex-col gap-3">
				<span className="text-sm font-medium text-slate-700">Категория <span className="text-red-500">*</span></span>
				<div className="grid grid-cols-3 gap-2">
					{CATEGORIES.map(({ id, label, icon: Icon }) => {
						const active = data.category === id;
						return (
							<button
								key={id}
								type="button"
								onClick={() => onChange('category', id)}
								className={cn(
									'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all',
									active ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
								)}
							>
								<Icon className="h-5 w-5" />
								<span className="text-sm font-medium">{label}</span>
							</button>
						);
					})}
				</div>
				{errors.category && <span className="text-sm text-red-600">{errors.category}</span>}
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-medium text-slate-700">Краткое описание <span className="text-red-500">*</span></label>
				<textarea
					value={data.shortDescription}
					onChange={(e) => onChange('shortDescription', e.target.value)}
					rows={4}
					className={cn(
						'w-full resize-none rounded-lg border bg-white px-4 py-3 text-base text-slate-800 outline-none transition-colors',
						errors.shortDescription ? 'border-red-500' : 'border-slate-300 focus:border-indigo-700',
					)}
					placeholder="Опишите, что ждет участников..."
				/>
				<div className="flex justify-between">
					{errors.shortDescription && <span className="text-sm text-red-600">{errors.shortDescription}</span>}
					<span className="text-xs text-slate-400 ml-auto">{data.shortDescription.length} / 500</span>
				</div>
			</div>
		</div>
	);
}

/* ─── Step 2: Дата и место ─── */
function Step2({ data, errors, onChange }: { data: FormData; errors: Record<string, string>; onChange: <K extends keyof FormData>(f: K, v: FormData[K]) => void }) {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold leading-8 text-slate-800">Дата и место</h2>
				<p className="text-sm text-slate-500">Укажите когда и где пройдет мероприятие.</p>
			</header>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-medium text-slate-700">Дата проведения <span className="text-red-500">*</span></label>
				<DatePicker
					value={data.dateISO}
					onChange={(v) => onChange('dateISO', v)}
					className={errors.dateISO ? '[&>button]:border-red-500' : ''}
				/>
				{errors.dateISO && <span className="text-sm text-red-600">{errors.dateISO}</span>}
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-medium text-slate-700">Город <span className="text-red-500">*</span></label>
				<CustomSelect
					options={CITIES.map((c) => ({ value: c, label: c }))}
					value={data.city}
					onChange={(v) => onChange('city', v)}
				/>
			</div>

			<InputField
				label="Место проведения"
				value={data.location}
				onChange={(v) => onChange('location', v)}
				error={errors.location}
				placeholder="Например, Экспоцентр, Москва"
				icon={<MapPin className="h-4 w-4 text-slate-400" />}
			/>

			<div className="flex flex-col gap-3">
				<span className="text-sm font-medium text-slate-700">Формат <span className="text-red-500">*</span></span>
				<div className="grid grid-cols-3 gap-2">
					{FORMATS.map(({ id, label, icon: Icon }) => {
						const active = data.format === id;
						return (
							<button
								key={id}
								type="button"
								onClick={() => onChange('format', id)}
								className={cn(
									'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all',
									active ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
								)}
							>
								<Icon className="h-5 w-5" />
								<span className="text-sm font-medium">{label}</span>
							</button>
						);
					})}
				</div>
				{errors.format && <span className="text-sm text-red-600">{errors.format}</span>}
			</div>
		</div>
	);
}

/* ─── Step 3: Участники ─── */
function Step3({ data, errors, onChange }: { data: FormData; errors: Record<string, string>; onChange: <K extends keyof FormData>(f: K, v: FormData[K]) => void }) {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold leading-8 text-slate-800">Участники</h2>
				<p className="text-sm text-slate-500">Укажите ожидаемое количество участников и стоимость.</p>
			</header>

			<InputField
				label="Количество участников"
				value={data.attendees}
				onChange={(v) => onChange('attendees', v)}
				error={errors.attendees}
				placeholder="Например, 200+ Attendees"
				icon={<Users className="h-4 w-4 text-slate-400" />}
			/>

			<InputField
				label="Стоимость участия"
				value={data.price}
				onChange={(v) => onChange('price', v)}
				error={errors.price}
				placeholder="Например, Бесплатно или ₽ 5,000"
				icon={<CreditCard className="h-4 w-4 text-slate-400" />}
			/>
		</div>
	);
}

/* ─── Step 4: Публикация ─── */
function Step4({ data }: { data: FormData }) {
	return (
		<div className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold leading-8 text-slate-800">Публикация</h2>
				<p className="text-sm text-slate-500">Проверьте данные перед публикацией мероприятия.</p>
			</header>

			<div className="flex flex-col gap-4 rounded-lg bg-slate-50 p-4">
				<PreviewRow label="Название" value={data.title} />
				<PreviewRow label="Категория" value={data.category} />
				<PreviewRow label="Описание" value={data.shortDescription} />
				<PreviewRow label="Дата" value={data.dateISO} />
				<PreviewRow label="Город" value={data.city} />
				<PreviewRow label="Место" value={data.location} />
				<PreviewRow label="Формат" value={data.format} />
				<PreviewRow label="Участники" value={data.attendees} />
				<PreviewRow label="Цена" value={data.price} />
			</div>
		</div>
	);
}

/* ─── Helpers ─── */
function InputField({
	label,
	value,
	onChange,
	error,
	placeholder,
	icon,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	error?: string;
	placeholder?: string;
	icon?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-sm font-medium text-slate-700">{label} <span className="text-red-500">*</span></label>
			<div className="relative">
				{icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={cn(
						'h-12 w-full rounded-lg border bg-white px-4 text-base text-slate-800 outline-none transition-colors',
						error ? 'border-red-500' : 'border-slate-300 focus:border-indigo-700',
						icon ? 'pl-10' : '',
					)}
				/>
			</div>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	);
}

function PreviewRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-4 text-sm">
			<span className="text-slate-500">{label}</span>
			<span className="font-medium text-slate-800 text-right">{value || '—'}</span>
		</div>
	);
}
