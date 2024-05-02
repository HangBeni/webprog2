export async function load({ cookies }) {
	//session get
	const session = cookies.get('session');
	if (!session) {
		return {
			inSession: false,
			userID: 0 /*user id from session */,
			userBand: 0
		};
	} else {
		const data = JSON.parse(session) as {userID: number, bandID: number};
		return {
			inSession: true,
			userID: data.userID /*user id from session */,
			userBand: data.bandID
		};
	}
}
