import { create } from 'zustand';

export type EventStatus = 'open' | 'soon' | 'full' | 'almost' | 'closed';
export type EventCategory = 'Technology' | 'Design' | 'Business';
export type EventFormat = 'Online' | 'Offline' | 'Hybrid';

export type ProgramItem = {
	id: string;
	time: string;
	title: string;
	description: string;
	icon: 'coffee' | 'mic' | 'users';
	done?: boolean;
};

export type EventCondition = {
	icon: 'shirt' | 'shield';
	title: string;
	description: string;
};

export type EventModel = {
	id: string;
	slug: string;
	title: string;
	shortDescription: string;
	longDescription: string[];
	image: string;
	heroImage: string;
	mapImage: string;
	category: EventCategory;
	status: EventStatus;
	featured?: boolean;
	format: EventFormat;
	day: string;
	time: string;
	dateRange: string;
	dateISO: string;
	fullDate: string;
	timeRange: string;
	city: string;
	location: string;
	venue: string;
	venueAddress: string;
	attendees: string;
	price: string;
	priceShort: string;
	organizer: { name: string; rating: string; initial: string };
	weather: { description: string; temperature: string };
	program: ProgramItem[];
	conditions: EventCondition[];
};

const EVENTS: EventModel[] = [
	{
		id: 'global-tech-synergy-2024',
		slug: 'global-tech-synergy-2024',
		title: 'Global Tech Synergy 2024',
		shortDescription:
			'Крупнейшая конференция для IT-лидеров, разработчиков и продуктовых менеджеров.',
		longDescription: [
			'Присоединяйтесь к нам на Global Tech Synergy 2024 — ведущем событии в индустрии программного обеспечения. В этом году мы сосредоточимся на практических аспектах внедрения машинного обучения в B2B продукты, оптимизации облачной инфраструктуры и современных методологиях управления распределенными командами.',
			'Вас ждут более 30 спикеров из топовых технологических компаний, интерактивные воркшопы, панельные дискуссии и нетворкинг-сессии. Мы создали пространство, где идеи превращаются в реальные решения, а профессиональные связи перерастают в долгосрочные партнерства.',
		],
		image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=377&h=200&fit=crop',
		category: 'Technology',
		status: 'open',
		featured: true,
		format: 'Offline',
		day: '15 Окт',
		time: '10:00',
		dateRange: 'Oct 15 - 17, 2024',
		dateISO: '2024-10-15',
		fullDate: '15 Октября, 2024',
		timeRange: '10:00 - 19:00',
		city: 'Москва',
		location: 'Москва, Экспоцентр',
		venue: 'Экспоцентр',
		venueAddress: 'Краснопресненская наб., 14, Москва, Россия, 123100',
		attendees: '2,500+ Attendees',
		price: 'From $299',
		priceShort: 'From $299',
		organizer: { name: 'TechEvents LLC', rating: '4.9/5', initial: 'T' },
		weather: { description: 'Облачно, без осадков', temperature: '14°C' },
		program: [
			{
				id: '1',
				time: '09:00 - 10:00',
				title: 'Регистрация и приветственный кофе',
				description:
					'Сбор участников, выдача бейджей и утренний нетворкинг в главном холле.',
				icon: 'coffee',
				done: true,
			},
			{
				id: '2',
				time: '10:00 - 11:30',
				title: 'Главный Keynote: Будущее SaaS',
				description:
					'Выступление CEO компании TechVision о глобальных трендах и перспективах развития облачных платформ в ближайшие 5 лет.',
				icon: 'mic',
			},
			{
				id: '3',
				time: '12:00 - 14:00',
				title: 'Панельная дискуссия: AI в B2B',
				description:
					'Обсуждение этических и технических аспектов внедрения генеративного ИИ в корпоративные решения. С участием ведущих Data Scientist-ов.',
				icon: 'users',
			},
		],
		conditions: [
			{
				icon: 'shirt',
				title: 'Дресс-код',
				description: 'Business Casual. Рекомендуем удобную обувь для активного нетворкинга.',
			},
			{
				icon: 'shield',
				title: 'Пропускной режим',
				description:
					'Вход строго по именным бейджам и документу, удостоверяющему личность.',
			},
		],
	},
	{
		id: 'ux-ui-masterclass',
		slug: 'ux-ui-masterclass',
		title: 'UX/UI Design Masterclass',
		shortDescription:
			'Интенсивный воркшоп по созданию удобных интерфейсов и пользовательского опыта.',
		longDescription: [
			'Практический мастер-класс для дизайнеров и продуктовых менеджеров. Разбираем реальные кейсы, проводим юзабилити-тестирование и учимся защищать дизайн-решения перед стейкхолдерами.',
			'В программе: фундамент UX-исследований, прототипирование в Figma, дизайн-системы и работа с разработчиками.',
		],
		image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=377&h=200&fit=crop',
		category: 'Design',
		status: 'almost',
		format: 'Online',
		day: '22 Окт',
		time: '14:00',
		dateRange: 'Nov 05, 2024',
		dateISO: '2024-11-05',
		fullDate: '5 Ноября, 2024',
		timeRange: '14:00 - 18:00',
		city: 'Онлайн',
		location: 'Онлайн',
		venue: 'Zoom',
		venueAddress: 'Подключение по ссылке после регистрации.',
		attendees: '45/50 Registered',
		price: '₽ 5,000',
		priceShort: '₽ 5,000',
		organizer: { name: 'Design Lab', rating: '4.8/5', initial: 'D' },
		weather: { description: 'Не применимо', temperature: '—' },
		program: [
			{
				id: '1',
				time: '14:00 - 15:00',
				title: 'Введение в UX-исследования',
				description: 'Ставим задачи и проводим интервью с пользователями.',
				icon: 'mic',
			},
			{
				id: '2',
				time: '15:00 - 17:00',
				title: 'Прототипирование в Figma',
				description: 'Собираем кликабельный прототип лендинга.',
				icon: 'users',
			},
		],
		conditions: [
			{
				icon: 'shield',
				title: 'Подключение',
				description: 'Ссылка на Zoom приходит на email за час до старта.',
			},
		],
	},
	{
		id: 'agile-leadership-meetup',
		slug: 'agile-leadership-meetup',
		title: 'Agile Leadership Meetup',
		shortDescription:
			'Встреча для руководителей и скрам-мастеров по обмену опытом внедрения гибких методологий.',
		longDescription: [
			'Закрытая встреча для лидеров команд. Делимся факапами, обсуждаем как масштабировать Agile в крупных организациях и говорим о том, что не работает в книгах.',
		],
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=377&h=200&fit=crop',
		category: 'Business',
		status: 'full',
		format: 'Offline',
		day: '05 Ноя',
		time: '09:00',
		dateRange: 'Nov 05, 2024',
		dateISO: '2024-11-05',
		fullDate: '5 Ноября, 2024',
		timeRange: '09:00 - 13:00',
		city: 'Санкт-Петербург',
		location: 'Санкт-Петербург',
		venue: 'Точка кипения',
		venueAddress: 'СПб, ул. Большая Морская, 67',
		attendees: '150 Attendees',
		price: 'Бесплатно',
		priceShort: 'Бесплатно',
		organizer: { name: 'Agile.SPB', rating: '4.7/5', initial: 'A' },
		weather: { description: 'Пасмурно', temperature: '6°C' },
		program: [
			{
				id: '1',
				time: '09:00 - 10:00',
				title: 'Открытие и нетворкинг',
				description: 'Знакомство участников.',
				icon: 'coffee',
			},
		],
		conditions: [
			{
				icon: 'shield',
				title: 'Регистрация',
				description: 'Только по приглашению.',
			},
		],
	},
	{
		id: 'global-saas-summit-2024',
		slug: 'global-saas-summit-2024',
		title: 'Global SaaS Summit 2024',
		shortDescription:
			'Join industry leaders for a three-day exploration of the future of software as a service.',
		longDescription: [
			'Three-day conference featuring keynote speakers from top tech firms. Workshops on cloud architecture, product-led growth and SaaS metrics.',
		],
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1549296788-29199a0d4352?w=377&h=200&fit=crop',
		category: 'Technology',
		status: 'open',
		featured: true,
		format: 'Hybrid',
		day: '15 Окт',
		time: '10:00',
		dateRange: 'Oct 15 - 17, 2024',
		dateISO: '2024-10-15',
		fullDate: '15-17 Октября, 2024',
		timeRange: '09:00 - 19:00',
		city: 'Москва',
		location: 'Moscow / Hybrid',
		venue: 'Moscow Tech Hub',
		venueAddress: 'Москва, Пресненская наб., 12',
		attendees: '2,500+ Attendees',
		price: 'From $299',
		priceShort: 'From $299',
		organizer: { name: 'SaaS World', rating: '4.9/5', initial: 'S' },
		weather: { description: 'Облачно', temperature: '14°C' },
		program: [
			{
				id: '1',
				time: '09:00 - 10:00',
				title: 'Регистрация',
				description: 'Получение бейджей и welcome coffee.',
				icon: 'coffee',
				done: true,
			},
			{
				id: '2',
				time: '10:00 - 12:00',
				title: 'Keynote: SaaS in 2030',
				description: 'Видение будущего от ведущих CEO.',
				icon: 'mic',
			},
		],
		conditions: [
			{
				icon: 'shirt',
				title: 'Дресс-код',
				description: 'Business Casual.',
			},
		],
	},
	{
		id: 'startup-founders-mixer',
		slug: 'startup-founders-mixer',
		title: 'Startup Founders Mixer',
		shortDescription: 'Networking event for early-stage founders and investors.',
		longDescription: [
			'Закрытая встреча для основателей стартапов и инвесторов серии А. Питч-сессии, спид-нетворкинг и неформальное общение.',
		],
		image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1565335020653-1d17da3e8e96?w=377&h=200&fit=crop',
		category: 'Business',
		status: 'closed',
		format: 'Offline',
		day: '12 Дек',
		time: '18:00',
		dateRange: 'Dec 12, 2024',
		dateISO: '2024-12-12',
		fullDate: '12 Декабря, 2024',
		timeRange: '18:00 - 22:00',
		city: 'Санкт-Петербург',
		location: 'St. Petersburg',
		venue: 'Loft Hall',
		venueAddress: 'СПб, наб. реки Фонтанки, 76',
		attendees: '150 Attendees',
		price: '$50',
		priceShort: '$50',
		organizer: { name: 'Founders Club', rating: '4.6/5', initial: 'F' },
		weather: { description: 'Снег', temperature: '-3°C' },
		program: [
			{
				id: '1',
				time: '18:00 - 19:00',
				title: 'Welcome drinks',
				description: 'Открытие мероприятия.',
				icon: 'coffee',
			},
		],
		conditions: [
			{
				icon: 'shield',
				title: 'Дресс-код',
				description: 'Smart casual.',
			},
		],
	},
	{
		id: 'agile-scrum-day',
		slug: 'agile-scrum-day',
		title: 'Agile & Scrum Day',
		shortDescription: 'Однодневная конференция по гибким методологиям разработки.',
		longDescription: [
			'Доклады, воркшопы и кейсы внедрения Scrum в крупных организациях. Сертификаты участникам.',
		],
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
		heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1232&h=400&fit=crop',
		mapImage: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=377&h=200&fit=crop',
		category: 'Business',
		status: 'open',
		format: 'Offline',
		day: '18 Янв',
		time: '10:00',
		dateRange: 'Jan 18, 2025',
		dateISO: '2025-01-18',
		fullDate: '18 Января, 2025',
		timeRange: '10:00 - 18:00',
		city: 'Москва',
		location: 'Москва',
		venue: 'Конгресс-холл',
		venueAddress: 'Москва, ул. Тверская, 22',
		attendees: '300 Attendees',
		price: 'Бесплатно',
		priceShort: 'Бесплатно',
		organizer: { name: 'Agile Russia', rating: '4.8/5', initial: 'A' },
		weather: { description: 'Снег', temperature: '-8°C' },
		program: [
			{
				id: '1',
				time: '10:00 - 11:00',
				title: 'Открытие',
				description: 'Welcome speech от организаторов.',
				icon: 'mic',
			},
		],
		conditions: [
			{
				icon: 'shield',
				title: 'Регистрация',
				description: 'Бесплатная по предварительной заявке.',
			},
		],
	},
];

type FilterState = {
	date: string;
	city: string;
	categories: EventCategory[];
	format: EventFormat | 'All';
	search: string;
};

type State = {
	events: EventModel[];
	filters: FilterState;
	setFilters: (filters: Partial<FilterState>) => void;
	resetFilters: () => void;
	getEventById: (id: string) => EventModel | undefined;
	getFeatured: () => EventModel | undefined;
	getFilteredEvents: () => EventModel[];
	addEvent: (event: EventModel) => void;
};

export function filterEvents(events: EventModel[], filters: FilterState): EventModel[] {
	return events.filter((e) => {
		if (filters.date && e.dateISO < filters.date) return false;
		if (filters.city !== 'All Cities' && e.city !== filters.city) return false;
		if (filters.categories.length > 0 && !filters.categories.includes(e.category)) return false;
		if (filters.format !== 'All' && e.format !== filters.format) return false;
		if (filters.search) {
			const q = filters.search.toLowerCase();
			return (
				e.title.toLowerCase().includes(q) ||
				e.shortDescription.toLowerCase().includes(q)
			);
		}
		return true;
	});
}

const DEFAULT_FILTERS: FilterState = {
	date: '',
	city: 'All Cities',
	categories: ['Technology'],
	format: 'All',
	search: '',
};

export const useEventsStore = create<State>((set, get) => ({
	events: EVENTS,
	filters: DEFAULT_FILTERS,
	setFilters: (partial) =>
		set((state) => ({ filters: { ...state.filters, ...partial } })),
	resetFilters: () => set({ filters: DEFAULT_FILTERS }),
	getEventById: (id) => get().events.find((e) => e.id === id || e.slug === id),
	getFeatured: () => get().events.find((e) => e.featured),
	getFilteredEvents: () => {
		const { events, filters } = get();
		return filterEvents(events, filters);
	},
	addEvent: (event) => set((state) => ({ events: [event, ...state.events] })),
}));
