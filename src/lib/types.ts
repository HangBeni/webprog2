export type Links = {
	link: string;
	name: string;
};

export type FormType = {
	userName: string;

	userPassword: string;

	userEmail?: string;

	userBand?: string;
};

export type User = {
	id: number;
	name: string;
	band?: string;
	password: string;
};
