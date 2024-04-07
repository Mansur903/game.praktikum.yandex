import {Theme} from './models/Theme'
import {UserTheme} from './models/UserTheme'
import {Sequelize, SequelizeOptions} from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '1111',
	database: 'game',
	dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([UserTheme, Theme])

export async function dbConnect() {
	try {
		await sequelize.authenticate() // Проверка аутентификации в БД
		await sequelize.sync() // Синхронизация базы данных
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
