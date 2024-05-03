import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import {User} from './models/user'
import {Topic} from './models/topic'
import {Comment} from './models/comment'
import {CommentReply} from './models/commentReplies'
import {TopicReaction} from './models/reaction'
import {Theme} from './models/Theme'
import {UserTheme} from './models/UserTheme'

const sequelizeOptions: SequelizeOptions = {
	host: 'postgres',
	port: +(process.env.POSTGRES_PORT || 5432),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([User, Topic, Comment, CommentReply, TopicReaction, UserTheme, Theme])

export async function dbConnect() {
	try {
		await sequelize.authenticate() // Проверка аутентификации в БД
		await sequelize.sync() // Синхронизация базы данных
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
