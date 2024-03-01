import db from '../../database/db';
import type { FormType, User } from '../../utils/types';
import type { RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({request}) =>  {
    let formData: FormType = await request.json();
    db.get<User>(
        'SELECT * FROM user WHERE name = ? AND password = ? AND band = ?;',
        [formData.userName, formData.userPassword, formData.userBand],
        (err, row) => {
            if (err || !row) {
                console.log(row);
                return {
                    success: false,
                    message: 'Hello from the server -- Error',
                    body: formData,
                    res: null
                };
            }
            console.log(row + ' In the db query');
            return { success: true, message: 'Hello from the server', body: formData, res: row };
        }
    );
return new Response();
}
