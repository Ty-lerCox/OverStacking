export interface IGame {
	name: string;
	img: string;
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
	dateTime: Date;
	slots: ISlot[]; 
}

export interface ISlot {
	name: string;
	userID: string;
}

export interface ISkillRange {
	lower: number;
	upper: number;
}