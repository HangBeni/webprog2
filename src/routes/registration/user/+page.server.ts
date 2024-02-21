import type { Actions } from '@sveltejs/kit';
import type { FormType } from '../../../utils/types';

export const actions = {
	manageUser: async ({request}) => {
		const data = await request.formData();
		const formData: FormType = {
			userName: data.get("userName")!.toString(),
			userBand: data.get("userBand")!.toString(),
			userEmail: data.get("userEmail")!.toString(),
			userPassword: data.get("userPassword")!.toString()

		}
		return {
			succes: true,
			message: 'Hello from the server',
			body:  formData
		};
	}
} satisfies Actions;
