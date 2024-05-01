export type Links = {
	link: string;
	name: string;
};

export type User = {
	name: string;
	band: string;
	password: string;
	email: string;
};

export type Band = {
	name: string;
	birth: Date;
	genre: string;
	story: string;
};
export type Post = {
	id: number;
	author: string;
	content: string;
	created_at: string;
	modified_at?: string;
};

export type Comment = {
	post_id: number;
	author: string;
	content: string;
	created_at: string;
	modified_at?: string;
};

export enum RegistrationStatus {
	OK,
	ThereIs,
	ServerFail
}
