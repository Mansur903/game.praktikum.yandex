import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import {TopicReaction} from './models/reaction'

const sequelizeOptions: SequelizeOptions = {
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'my-password', // Ваш пароль от локальной БД
	database: 'postgres',
	dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([TopicReaction])

export async function dbConnect() {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
