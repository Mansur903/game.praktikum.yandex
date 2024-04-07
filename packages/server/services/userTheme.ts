import {Request, Response} from 'express'
import {UserTheme} from '../models/UserTheme'
import {Theme} from '../models/Theme'

export const setTheme = async (req: Request, res: Response) => {
	/**
	 * Так как по ТЗ менять тему, может любой, то генерим уникальный ключ на фронте,
	 * и передаем его в параметре device.
	 */
	const {code, device} = req.body
	const theme = await Theme.findOne({
		where: {
			theme: code
		}
	})
	if (!theme) {
		res.status(404).json({message: 'Theme not found'})
		return
	}
	const [userTheme] = await UserTheme.findOrCreate({
		where: {
			device
		},
		defaults: {device, themeId: theme?.dataValues.id}
	})
	res.status(200).json(userTheme)
}

export const getTheme = async (req: Request, res: Response) => {
	const device = req.params.device
	const theme = await UserTheme.findOne({
		where: {
			device
		},
		include: Theme
	})

	if (!theme) {
		res.status(404).json({message: 'Theme for this device not found'})
		return
	}
	res.status(200).json(theme.dataValues)
}
