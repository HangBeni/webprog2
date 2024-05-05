
export async function load({ cookies }) {
	//session get
	const session = cookies.get('session');
	if (!session) {
		return {
			inSession: false,
			userID: 0 ,
			userBand: 0
		};
	} else {
		const data = JSON.parse(session) as {userID: number, bandID: number | null};
		return {
			inSession: true,
			userID: data.userID ,
			userBand: data.bandID
		};
	}
}
