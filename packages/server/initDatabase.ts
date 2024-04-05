import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import {User} from './models/user'
import {Topic} from './models/topic'
import {Forum} from './models/forum'
import {Comment} from './models/comment'

const sequelizeOptions: SequelizeOptions = {
	host: 'localhost',
	port: 5433,
	username: 'postgres',
	password: '8903',
	database: 'postgres',
	dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([User, Topic, Forum, Comment])

export async function dbConnect() {
	try {
		await sequelize.authenticate() // Проверка аутентификации в БД
		await sequelize.sync() // Синхронизация базы данных
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
