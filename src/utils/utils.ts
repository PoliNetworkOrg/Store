import { Languages, SchoolToPCs } from './types';

export function parseLanguage(language: string): Languages {
	if (language.toLowerCase() === 'it') {
		return Languages.IT;
	} else {
		return Languages.EN;
	}
}

export function parseFrontmatter<T extends Record<string, any>>(frontmatter: T, language: Languages): T {
	const a = copyRecord({}, frontmatter, language);
	//console.log("obj:", JSON.stringify(a), "\n\nrecord:", JSON.stringify(frontmatter))
	return a;
}

export function copyRecord<T extends Record<string, any>>(obj: any, record: T, language: Languages): T {
	const props = Object.keys(record);
	for (let i = 0; i < props.length; i++) {
		const field = props[i];
		if (typeof record[field] === 'object' && !Array.isArray(record[field])) {
			//console.log(1, " ", field, ": ", record[field]);
			obj[field] = copyRecord({}, record[field], language);
		} else if (Array.isArray(record[field])) {
			//console.log(2, " ", field, ": ", record[field]);
			if (record[field].length > 0) {
				const propsL2 = Object.keys(record[field][0]);
				if (propsL2.includes('lang')) {
					record[field].map((el: any) => {
						if (el.lang === language) {
							obj[field] = {};
							for (let e = 0; e < propsL2.length; e++) {
								obj[field][propsL2[e]] = el[propsL2[e]];
							}
						}
					});
				} else {
					obj[field] = record[field].map((element: any) => {
						return copyRecord({}, element, language);
					});
				}
			}
		} else {
			//console.log(3, " ", field, ": ", record[field]);
			obj[field] = record[field];
		}
	}
	return obj;
}

export async function getPCmap(): Promise<SchoolToPCs> {
	return {
		schools: [
			{
				school: 'ieee',
				courses: [
					{
						slug: 'info',
						course: ['Informatica 🖥', 'Computer Science 🖥'],
						desc: ['Ingegneria Informatica', 'Computer Science Engineering'],
						pcs: [
							{
								name: ['Marca1', 'Marca1'],
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: '/img/tools.jpg',
								price: 120000,
							}
						],
					}
				],
			},
			{
				school: 'design',
				courses: [
					{
						slug: 'infoc',
						course: ['info', 'infoE'],
						desc: ['boh', 'boheng'],
						pcs: [
							{
								name: ['ciao', 'ciaoE'],
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: 120000,
							},
						],
					}
				],
			},
			{
				school: 'auic',
				courses: [
					{
						slug: 'infoa',
						course: ['info', 'infoE'],
						desc: ['boh', 'boheng'],
						pcs: [
							{
								name: ['ciao', 'ciaoE'],
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: 120000,
							},
						],
					}
				],
			},
			{
				school: 'icat',
				courses: [
					{
						slug: 'info23',
						course: ['info', 'infoE'],
						desc: ['boh', 'boheng'],
						pcs: [
							{
								name: ['ciao', 'ciaoE'],
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: 120000,
							},
						],
					}
				],
			},
		],
	};
}
