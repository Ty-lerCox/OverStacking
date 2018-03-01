export interface ICategory {
	name: string;
	imgBg: string;
	type: string;
	show: boolean;
}

export interface IStack {
	description: string;
	type: string;
	comp: string;
	owner: string;
	category: number;
	tank_heroes: string;
	dps_heroes: string;
	support_heroes: string;
	skill_range: ISkillRange;
}

export interface ISkillRange {
	lower: number;
	upper: number;
}