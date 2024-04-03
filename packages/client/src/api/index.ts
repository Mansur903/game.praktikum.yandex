const baseUrl = 'https://ya-praktikum.tech/api/v2'

const api = {
	auth: {
		signup: `${baseUrl}/auth/signup`
	},
	leaderboard: {
		addRecord: `${baseUrl}/leaderboard`,
		getAll: `${baseUrl}/leaderboard/all`,
		getTeam: `${baseUrl}/leaderboard/Fantastic4`
	}
}

export default api
