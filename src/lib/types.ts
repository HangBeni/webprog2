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
export type Post = {
	id: number;
	author: string;
	content: string;
	created_at: string;
	modified_at?: string;
};

export type Comment = {
	id: number;
	post_id: number;
	author: string;
	content: string;
	created_at: string;
	modified_at?: string;
};
