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
						course: [{ slug: 'info', title: { it: 'Informatica 🖥', en: 'Computer Science 🖥' } }],
						desc: { it: 'Ingegneria Informatica', en: 'Computer Science Engineering' },
						extra: ['Ad informatica il software più pesante, prestazionalmente, è Vivado'],
						pcs: [
							{
								name: 'HP 255 G8',
								specs: [
								['AMD 3000', 'AMD 3000'],
								['RAM 8GB DDR4 2400MHz', 'RAM 8GB DDR4 2400MHz'],
								['AMD RADEON integrata', 'AMD RADEON integrata'],
								['256GB SSD', '256GB SSD'],
								['15.6" HD ready', ''],
							],
								stars: 4.5,
								url: 'https://amzn.to/3EB0Hcn',
								image: 'https://m.media-amazon.com/images/I/81nkSdV+0wL._AC_SL1500_.jpg',
								price: { value: 292.0, time: '2022-11-25T11:48:01' },
								complete: true,
							},
							{
								name: 'HP 15s-eq2009sl',
								specs: [
									['AMD Ryzen 7 5700U', 'AMD Ryzen 7 5700U'],
									['RAM 8GB DDR4', 'RAM 8GB DDR4'],
									['AMD Radeon integrata', 'AMD Radeon integrata'],
									['512GB SSD', '512GB SSD'],
									['15.6" FHD antiriflesso', '15.6" FHD antiriflesso'],
								],
								stars: 4,
								url: 'https://amzn.to/3VnIIgd',
								image: 'https://m.media-amazon.com/images/I/816p4kldSRL._AC_SX450_.jpg',
								price: { value: 565.9, time: '2022-11-25T11:57:00' },
								complete: true,
							},
							{
								name: 'MSI Katana GF66 11UC-1224IT',
								specs: [
									['Intel I7-11800H', ''],
									['RAM 16GB DDR4 3200MHz', ''],
									['Nvidia RTX 3050, 4GB GDDR6', 'Nvidia RTX 3050, 4GB GDDR6'],
									['512GB SSD M.2', '512GB SSD M.2'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 4,
								url: 'https://amzn.to/3Xufy0O',
								image: 'https://m.media-amazon.com/images/I/71yxQ9XaIwL._AC_SL1500_.jpg',
								price: { value: 1199.0, time: '2022-11-24T23:00:00' },
								complete: true,
							},
						],
					},
					{
						course: [{ slug: 'management', title: { it: 'Gestionale 📊', en: 'Management 📊' } }],
						desc: { it: 'Ingegneria Gestionale', en: 'Management Engineering' },
						extra: [],
						pcs: [
							{
								name: 'HP 255 G8',
								specs: [
									['AMD Athlon 3020', 'AMD Athlon 3020'],
									['RAM 16 GB DDR4 2.6 GHz', 'RAM 16 GB DDR4 2.6 GHz'],
									['RADEON FULL HD', 'RADEON FULL HD'],
									['628 GB SSHD', '628 GB SSHD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 3,
								url: 'https://amzn.to/3gvrEX8',
								image: 'https://m.media-amazon.com/images/I/91oVC1eDSSL._AC_SY450_.jpg',
								price: { value: 369.0, time: '2022-11-25T12:22:01' },
								complete: true,
							},
							{
								name: 'Acer Aspire 3 A315-58-56LW',
								specs: [
									['Intel Core i5-1135G7', 'Intel Core i5-1135G7'],
									['RAM 8 GB DDR4 2.4 GHz', 'RAM 8 GB DDR4 2.4 GHz'],
									['Intel Iris Xe, 4GB GDDR6', 'Intel Iris Xe, 4GB GDDR6'],
									['512 GB PCIe NVMe SSD', '512 GB PCIe NVMe SSD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 3,
								url: 'https://amzn.eu/d/c5lTsEg',
								image: 'https://m.media-amazon.com/images/I/81R86aeUJpL._AC_SX679_.jpg',
								price: { value: 609.0, time: '2022-11-24T23:00:01' },
								complete: false,
							},
							{
								name: 'Lenovo W11',
								specs: [
									['Intel Core i5-11gen', 'Intel Core i5-11gen'],
									['RAM 16 GB DDR4 2.4 GHz', 'RAM 16 GB DDR4 2.4 GHz'],
									['Intel Ultra HD integrata', 'Intel Ultra HD integrata'],
									['2256 GB SSHD', '2256 GB SSHD'],
									['15.6" FHD antiriflesso', '15.6" FHD antiriflesso'],
								],
								stars: 4,
								url: 'https://amzn.to/3gyConv',
								image: 'https://m.media-amazon.com/images/I/81dIT1iDUgL._AC_SL1500_.jpg',
								price: { value: 599.08, time: '2022-11-22T19:00:01' },
								complete: true,
							},
						],
					},
					{
						course: [
							{ slug: 'aerospace', title: { it: 'Aerospaziale 🚀', en: 'Aerospace 🚀' } },
							{ slug: 'energy', title: { it: 'Energetica 🔋', en: 'Energy 🔋' } },
							{ slug: 'mechanical', title: { it: 'Meccanica 🛠', en: 'Mechanical 🛠' } },
						],
						desc: {
							it: 'Ingegneria Aerospaziale, Energetica, Meccanica',
							en: 'Aerospace, Energy, Mechanical Engineering',
						},
						extra: [],
						pcs: [
							{
								name: 'HP 255 G8',
								specs: [
									['AMD Athlon 3020', 'AMD Athlon 3020'],
									['RAM 16 GB DDR4 2.6 GHz', 'RAM 16 GB DDR4 2.6 GHz'],
									['RADEON FULL HD', 'RADEON FULL HD'],
									['628 GB SSHD', '628 GB SSHD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 3,
								url: 'https://amzn.to/3gvrEX8',
								image: 'https://m.media-amazon.com/images/I/91oVC1eDSSL._AC_SY450_.jpg',
								price: { value: 369.0, time: '2022-11-25T12:22:01' },
								complete: true,
							},
							{
								name: 'Lenovo W11',
								specs: [
									['Intel Core i5-11gen', 'Intel Core i5-11gen'],
									['RAM 16 GB DDR4 2.4 GHz', 'RAM 16 GB DDR4 2.4 GHz'],
									['Intel Ultra HD integrata', 'Intel Ultra HD integrata'],
									['2256 GB SSHD', '2256 GB SSHD'],
									['15.6" FHD antiriflesso', '15.6" FHD antiriflesso'],
								],
								stars: 4,
								url: 'https://amzn.to/3gyConv',
								image: 'https://m.media-amazon.com/images/I/81dIT1iDUgL._AC_SL1500_.jpg',
								price: { value: 599.08, time: '2022-11-22T19:00:01' },
								complete: true,
							},
							{
								name: 'Dell Vostro 3510 ',
								specs: [
									['Intel Core i7-1165G7', 'Intel Core i7-1165G7'],
									['RAM 32 GB DDR', 'RAM 32 GB DDR'],
									['NVIDIA GEFORCE MX 350 GDDR6 2 GB', 'NVIDIA GEFORCE MX 350 GDDR6 2 GB'],
									['1012 GB SSHD', '1012 GB SSHD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 4,
								url: 'https://amzn.to/3gwWiPE',
								image: 'https://m.media-amazon.com/images/I/616JKwpx64L._AC_SY450_.jpg',
								price: { value: 1219.0, time: '2022-11-25T12:44:01' },
								complete: true,
							},
				
						],
					},
					{
						course: [{ slug: 'biomedical', title: { it: 'Biomedica 🧬', en: 'Biomedical 🧬' } }],
						desc: { it: 'Ingegneria Biomedica', en: 'Biomedical Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'electrical', title: { it: 'Elettrica 💡', en: 'Electrical 💡' } }],
						desc: { it: 'Ingegneria Elettrica', en: 'Electrical Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'electronics', title: { it: 'Elettronica 🔌', en: 'Electronics 🔌' } }],
						desc: { it: 'Ingegneria Elettronica', en: 'Electronics Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'physics', title: { it: 'Fisica 🧲', en: 'Physics 🧲' } }],
						desc: { it: 'Ingegneria Fisica', en: 'Physics Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'mathematical', title: { it: 'Matematica 🧮', en: 'Mathematical 🧮' } }],
						desc: { it: 'Ingegneria Matematica', en: 'Mathematical Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'chemical', title: { it: 'Chimica ⚗️', en: 'Chemical ⚗️' } }],
						desc: { it: 'Ingegneria Chimica', en: 'Chemical Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'mat&nano', title: { it: 'Mat&Nano 🔬', en: 'Mat&Nano 🔬' } }],
						desc: {
							it: 'Ingegneria dei Materiali e delle Nanotecnologie',
							en: 'Materials Engineering and Nanotechnology',
						},
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
					{
						course: [{ slug: 'automation', title: { it: 'Automazione 🤖', en: 'Automation 🤖' } }],
						desc: { it: 'Ingegneria dell" automazione', en: 'Automation Engineering' },
						extra: [],
						pcs: [
							{
								name: 'HP 255 G8',
								specs: [
									['AMD Athlon 3020', 'AMD Athlon 3020'],
									['RAM 16 GB DDR4 2.6 GHz', 'RAM 16 GB DDR4 2.6 GHz'],
									['RADEON FULL HD', 'RADEON FULL HD'],
									['628 GB SSHD', '628 GB SSHD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 3,
								url: 'https://amzn.to/3gvrEX8',
								image: 'https://m.media-amazon.com/images/I/91oVC1eDSSL._AC_SY450_.jpg',
								price: { value: 369.0, time: '2022-11-25T12:22:01' },
								complete: true,
							},
							{
								name: 'Lenovo W11',
								specs: [
									['Intel Core i5-11gen', 'Intel Core i5-11gen'],
									['RAM 16 GB DDR4 2.4 GHz', 'RAM 16 GB DDR4 2.4 GHz'],
									['Intel Ultra HD integrata', 'Intel Ultra HD integrata'],
									['2256 GB SSHD', '2256 GB SSHD'],
									['15.6" FHD antiriflesso', '15.6" FHD antiriflesso'],
								],
								stars: 4,
								url: 'https://amzn.to/3gyConv',
								image: 'https://m.media-amazon.com/images/I/81dIT1iDUgL._AC_SL1500_.jpg',
								price: { value: 599.08, time: '2022-11-22T19:00:01' },
								complete: true,
							},
						],
					},
					{
						course: [
							{
								slug: 'industrial production',
								title: { it: 'Produzione Industriale 🏭', en: 'Industrial Production 🏭' },
							},
						],
						desc: { it: 'Ingegneria della produzione industriale', en: 'Industrial Production Engineering' },
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false,
							},
						],
					},
				],
			},
			{
				school: 'design',
				courses: [
					{
						course: [{ slug: 'fashion', title: { it: 'Design della moda 👗', en: 'Fashion design 👗' } }],
						desc: { it: 'Design della moda', en: 'Fashion design' },
						extra: [],
						pcs: [
							{
								name: '2021 Apple MacBook Pro',
								specs: [
									['14"', '14"'],
									['512GB SSD', '512GB SSD'],
									['16GB RAM', '16GB RAM'],
								],
								stars: 4,
								url: 'https://amzn.to/3idt5tt',
								image: 'https://m.media-amazon.com/images/I/61cCf94xIEL._AC_SL1500_.jpg',
								price: { value: 2069, time: '2022-11-20T21:00:00' },
								complete: true,
							},
						],
					},
					{
						course: [
							{ slug: 'communication', title: { it: 'Design della comunicazione 📣', en: 'Communication design 📣' } },
						],
						desc: { it: 'Design della comunicazione', en: 'Communication design' },
						extra: [],
						pcs: [
							{
								name: 'MacBook Pro 13" 2022, M2, 8GB RAM, 512GB SSD',
								specs: [
									['Buon entrylevel con performance adeguate a carichi di lavoro medi', ''],
									['Display Retina con ottima restituzione cromatica.', ''],
									[
										'Gli 8GB di RAM sono particolarmente veloci e sufficienti alla maggior parte delle necessità, ma possono risultare stretti in caso di rendering foto/video intenso.',
										'',
									],
									['Se disponibile, valutare la configurazione con 16GB di RAM per una maggiore versatilità.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 3,
								url: 'https://amzn.to/3V3zrKt',
								image: 'https://m.media-amazon.com/images/I/61NRYreJ2cL._AC_SL1500_.jpg',
								price: { value: 1760.0, time: '2022-11-24T23:00:00' },
								complete: true,
							},
							{
								name: 'MacBook Pro 14" 2021, M1 Pro, CPU 8-core, GPU 14-core, 16GB RAM, 512GB SSD',
								specs: [
									[
										'Midrange con performance adeguate a carichi di lavoro medio-alti, inclusi rendering foto/video e 3D moderati.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 3.5,
								url: 'https://amzn.to/3AKhDfn',
								image: 'https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SL1500_.jpg',
								price: { value: 2069.0, time: '2022-11-21T14:00:00' },
								complete: true,
							},
							{
								name: 'MacBook Pro 16" 2021, M1 Pro, CPU 10-core, GPU 16-core, 16GB RAM, 512GB SSD',
								specs: [
									[
										'Ottimo midrange con performance adeguate a carichi di lavoro alti, inclusi rendering foto/video e 3D intensi.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 4,
								url: 'https://amzn.to/3Vmb0b2',
								image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_SL1500_.jpg',
								price: { value: 2539.99, time: '2022-11-21T14:00:00' },
								complete: true,
							},
							{
								name: 'MacBook Pro 16" 2021, M1 Max, CPU 10-core, GPU 32-core, 32GB RAM, 1TB SSD',
								specs: [
									[
										'Top di gamma con performance adeguate a carichi di lavoro altissimi, per un utilizzo prevalente in campo video e 3D.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 4.5,
								url: 'https://amzn.to/3EtEcG8',
								image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_SL1500_.jpg',
								price: { value: 3784.1, time: '2022-11-21T14:00:00' },
								complete: true,
							},
						],
					},
				],
			},
			{
				school: 'auic',
				courses: [
					{
						course: [{ slug: 'todo', title: { it: 'todo', en: 'todoEng' } }],
						desc: { it: 'todo', en: 'todoE' },
						extra: [],
						pcs: [
							{
								name: 'todo',
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: { value: 1000, time: '' },
								complete: false,
							},
						],
					},
				],
			},
			{
				school: 'icat',
				courses: [
					{
						course: [{ slug: 'todo', title: { it: 'todo', en: 'todoEng' } }],
						desc: { it: 'todo', en: 'todoE' },
						extra: [],
						pcs: [
							{
								name: 'todo',
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: { value: 1000, time: '' },
								complete: false,
							},
						],
					},
				],
			},
		],
	};
}
