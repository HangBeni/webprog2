export type Links = {
	link: string;
	name: string;
};

export type User = {
	id: number;
	name: string;
	band: string;
	password: string;
	email: string;
};
export type Band = {
	id: number;
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
	id: number;
	post_id: number;
	author: string;
	content: string;
	created_at: string;
	modified_at?: string;
};
