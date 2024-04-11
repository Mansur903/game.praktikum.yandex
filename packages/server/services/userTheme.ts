import {Request, Response} from 'express'
import {UserTheme} from '../models/UserTheme'
import {Theme} from '../models/Theme'

export const setTheme = async (req: Request, res: Response) => {
	/**
	 * Так как по ТЗ менять тему, может любой, то генерим уникальный ключ на фронте,
	 * и передаем его в параметре device.
	 */
	const {code, id} = req.body
	const device = req.headers['user-agent']
	const theme = await Theme.findOne({
		where: {
			theme: code
		}
	})
	if (!theme) {
		res.status(404).json({message: 'Theme not found'})
		return
	}

	await UserTheme.update(
		{device, themeId: theme?.dataValues.id},
		{
			where: {
				id
			},
			returning: true
		}
	)
	const result = await UserTheme.findOne({
		where: {
			id
		},
		include: Theme
	})
	res.status(200).json(result?.dataValues)
}

export const getTheme = async (req: Request, res: Response) => {
	const id = req.params.id
	const theme = await UserTheme.findOne({
		where: {
			id
		},
		include: Theme
	})

	if (!theme) {
		res.status(404).json({message: 'Theme for this device not found'})
		return
	}
	res.status(200).json(theme.dataValues)
}

export const createTheme = async (req: Request, res: Response) => {
	try {
		const device = req.headers['user-agent']
		console.log(device)
		const theme = await Theme.findOne()
		console.log(theme)
		const userTheme = await UserTheme.create({
			device,
			themeId: theme?.dataValues.id
		})
		res.status(200).json(userTheme.dataValues)
	} catch (e) {
		if (e instanceof Error) res.status(400).json({message: e.message})
	}
}
