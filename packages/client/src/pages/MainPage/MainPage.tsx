import styles from './MainPage.module.scss'
import logo from './../../assets/logo.png'
const MainPage = () => {
	const navigationLeft = [
		{title: 'Игра', path: '/game'},
		{title: 'Форум', path: '/forum'},
		{title: 'Рейтинг', path: '/leader-board'}
	]

	const navigationRight = [
		{title: 'Профиль', path: '/profile'},
		{title: 'Выйти', path: '/'}
	]

	return (
		<div className={styles['main-page']}>
			<div className={styles['main-page__container']}>
				<nav className={styles['main-page__navigation']}>
					<div className={styles['main-page__navigation-item']}>
						{navigationLeft.map((item) => (
							<div
								className={styles['main-page__navigation-item']}
								key={item.title}>
								<a href={item.path}>{item.title}</a>
							</div>
						))}
					</div>
					<div className={styles['main-page__navigation-item']}>
						{navigationRight.map((item) => (
							<div
								className={styles['main-page__navigation-item']}
								key={item.title}>
								<a href={item.path}>{item.title}</a>
							</div>
						))}
					</div>
				</nav>
				<div className={styles['main-page__content']}>
					<img
						src={logo}
						className={styles['main-page__content-logo']}
					/>
					<h3>Тут суер крутое описание игры</h3>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Etiam tempor orci eu lobortis
						elementum. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra.
						Turpis massa sed elementum tempus egestas sed sed risus. Blandit cursus risus
						at ultrices mi tempus imperdiet. Tristique senectus et netus et malesuada
						fames. Augue eget arcu dictum varius duis at. A lacus vestibulum sed arcu non
						odio. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Sed
						cras ornare arcu dui vivamus arcu felis bibendum ut. Viverra suspendisse
						potenti nullam ac tortor vitae. Eu facilisis sed odio morbi quis commodo odio.
						A arcu cursus vitae congue mauris. Sapien pellentesque habitant morbi
						tristique. Habitant morbi tristique senectus et netus. Scelerisque felis
						imperdiet proin fermentum leo. Purus sit amet luctus venenatis. Euismod nisi
						porta lorem mollis aliquam ut porttitor. Est placerat in egestas erat.
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage
