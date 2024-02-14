import type {Actions} from '@sveltejs/kit';
import VITE_SERVER_URL from '$env/static/public';

export const actions = {
    default: async ({request}) => {
        const data = request.formData();
        fetch(VITE_SERVER_URL + "/registration/band", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => {
              if (res.status !== 200) throw new Error(res.statusText);
              return res.json();
            })
            .catch((err) => {
              throw new Error(err);
            });
    }

} satisfies Actions;