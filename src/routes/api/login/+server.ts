import { type RequestEvent, type RequestHandler } from "./$types";

import type { FormType, User } from "../../../utils/types";
import db from "../../../database/db";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async (req: RequestEvent) => {
    const data = await req.request.formData();
    const formData: FormType = {
        userName: data.get('userName')!.toString(),
        userPassword: data.get('userPassword')!.toString(),
        userBand: data.get('userBand')!.toString()
    };

   await db.get<User>(
        'SELECT * FROM user WHERE name = ? AND password = ? AND band = ?;',
        [formData.userName, formData.userPassword, formData.userBand],
        (err, row: User) => {
            if (err || !row) {
            	console.error('Error while fetching user:', err);
            	return json({ success: false, message: 'Hello from the server', body: formData, res: 'Error' });
            }

            //console.log(row);
            // console.log(response);
            // return response;
            return json({ success: true, message: 'Hello from the server', body: formData, res: row });
        }
    );
    return json({ success: false, message: 'Hello from the server', body: formData, res: 'Error' });
}