export interface ILeader {
	position: number
	login: string
	score: number
	avatar?: string
}

export interface ILeaderboardResponseItem {
	data: {
		avatar: string
		login: string
		score: number
	}
}
