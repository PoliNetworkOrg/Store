/* eslint-disable @typescript-eslint/no-namespace */
export enum Languages {
	IT = 'it',
	EN = 'en',
}

export enum Schools {
	IEEE = 'ieee',
	DESIGN = 'design',
	ICAT = 'icat',
	AUIC = 'auic',
}

export interface LanguageString {
	it: string;
	en: string;
}

export interface PcMap {
	schools: SchoolToPCs[];
}

export interface SchoolToPCs {
	schools: SchoolCourse[];
}

export interface SchoolCourse {
	school: string;
	courses: CourseToPC[];
}

export interface CourseSlug {
	slug: string;
	title: LanguageString;
}

export interface CourseToPC {
	course: CourseSlug[];
	desc: LanguageString;
	pcs: PC[];
	extra: string[];
}

export interface PricePC {
	value: number;
	time: string;
}

export interface PC {
	name: string;
	specs: string[][];
	price: PricePC;
	url: string;
	image: string;
	stars: number;
	complete: boolean;
}

export function selectLanguage(langCode: string, languageString: LanguageString) {
	if (langCode == Languages.IT) {
		return languageString.it;
	}

	if (languageString.en && languageString.en.length > 0) return languageString.en;
	return languageString.it;
}

export namespace Languages {
	export function toNum(language: Languages): number {
		return Languages.values().indexOf(language);
	}

	export function values(): string[] {
		return (Object.values(Languages).filter((value) => typeof value === 'string') as string[]).map((element) => {
			return element.toLowerCase();
		});
	}

	export function languageSwitchPages(url: URL): string[] {
		const path = url.pathname.split('/');
		const langPages: string[] = [];
		for (let index = 0; index < Languages.values().length; index++) {
			path[1] = Languages.values()[index];
			langPages.push(path.join('/'));
		}
		return langPages;
	}
}

export class MultilangString {
	readonly _langString: Map<Languages, string>;

	constructor(langStrings: { string: string; language: Languages }[]) {
		if (langStrings == null || langStrings.length == 0) {
			throw Error('Language array cannot be null or empty');
		}
		this._langString = new Map<Languages, string>();
		langStrings.map((language) => {
			this._langString.set(language.language, language.string);
		});
	}

	get(language: Languages): string {
		const toReturn = this._langString.get(language);
		if (toReturn != undefined) {
			return toReturn;
		} else {
			const eng = this._langString.get(Languages.EN);
			if (eng != undefined) {
				return eng;
			} else {
				const [firstElement] = this._langString.values();
				return firstElement;
			}
		}
	}
}

export namespace Schools {
	export function toNum(language: Schools): number {
		return Schools.values().indexOf(language);
	}

	export function values(): string[] {
		return (Object.values(Schools).filter((value) => typeof value === 'string') as string[]).map((element) => {
			return element.toLowerCase();
		});
	}
}
