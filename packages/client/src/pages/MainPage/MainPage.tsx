import { useMemo } from 'react'
import styles from './MainPage.module.scss'
import logo from './../../assets/logo.png'
const MainPage = () => {
  const navigationLeft = useMemo(
    () => [
      { title: 'Игра', path: '/game' },
      { title: 'Форум', path: '/forum' },
      { title: 'Рейтинг', path: '/leader-board' },
    ],
    []
  )

  const navigationRight = useMemo(
    () => [
      { title: 'Профиль', path: '/profile' },
      { title: 'Выйти', path: '/' },
    ],
    []
  )

  return (
    <div className={styles['main-page']}>
      <div className={styles['main-page__container']}>
        <nav className={styles['main-page__navigation']}>
          <div className={styles['main-page__navigation-item']}>
            {navigationLeft.map((item, index) => (
              <div className={styles['main-page__navigation-item']}>
                <a href={item.path}>{item.title}</a>
              </div>
            ))}
          </div>
          <div className={styles['main-page__navigation-item']}>
            {navigationRight.map((item, index) => (
              <div className={styles['main-page__navigation-item']}>
                <a href={item.path}>{item.title}</a>
              </div>
            ))}
          </div>
        </nav>
        <div className={styles['main-page__content']}>
          <img src={logo} className={styles['main-page__content-logo']} />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam
            tempor orci eu lobortis elementum. Lobortis scelerisque fermentum
            dui faucibus in ornare quam viverra. Turpis massa sed elementum
            tempus egestas sed sed risus. Blandit cursus risus at ultrices mi
            tempus imperdiet. Tristique senectus et netus et malesuada fames.
            Augue eget arcu dictum varius duis at. A lacus vestibulum sed arcu
            non odio. Parturient montes nascetur ridiculus mus mauris vitae
            ultricies. Sed cras ornare arcu dui vivamus arcu felis bibendum ut.
            Viverra suspendisse potenti nullam ac tortor vitae. Eu facilisis sed
            odio morbi quis commodo odio. A arcu cursus vitae congue mauris.
            Sapien pellentesque habitant morbi tristique. Habitant morbi
            tristique senectus et netus. Scelerisque felis imperdiet proin
            fermentum leo. Purus sit amet luctus venenatis. Euismod nisi porta
            lorem mollis aliquam ut porttitor. Est placerat in egestas erat.
            Libero nunc consequat interdum varius sit amet mattis. In cursus
            turpis massa tincidunt dui ut ornare lectus. Ut sem viverra aliquet
            eget sit amet tellus. Ac turpis egestas maecenas pharetra convallis
            posuere morbi leo urna. Amet mattis vulputate enim nulla aliquet. At
            urna condimentum mattis pellentesque id nibh tortor id aliquet.
            Commodo nulla facilisi nullam vehicula ipsum a arcu. Suspendisse
            ultrices gravida dictum fusce ut placerat orci nulla pellentesque.
            Semper auctor neque vitae tempus quam pellentesque nec nam aliquam.
            Diam quam nulla porttitor massa id neque aliquam vestibulum morbi.
            Nisl purus in mollis nunc. Amet nisl purus in mollis. Nunc consequat
            interdum varius sit. Ut placerat orci nulla pellentesque. Hac
            habitasse platea dictumst vestibulum rhoncus. Etiam dignissim diam
            quis enim lobortis scelerisque fermentum. Ac turpis egestas maecenas
            pharetra convallis posuere morbi. Dui ut ornare lectus sit amet est.
            Ut morbi tincidunt augue interdum velit euismod in. Elit at
            imperdiet dui accumsan sit. Nunc sed blandit libero volutpat. Semper
            viverra nam libero justo laoreet sit amet cursus. Et sollicitudin ac
            orci phasellus egestas tellus rutrum tellus pellentesque. Rutrum
            quisque non tellus orci ac auctor augue mauris augue. Iaculis at
            erat pellentesque adipiscing commodo elit. Vestibulum lorem sed
            risus ultricies tristique nulla aliquet. Id neque aliquam vestibulum
            morbi blandit cursus risus. Amet purus gravida quis blandit. Morbi
            blandit cursus risus at ultrices mi tempus. Eu non diam phasellus
            vestibulum lorem sed. Mattis molestie a iaculis at erat pellentesque
            adipiscing commodo elit. Diam vulputate ut pharetra sit amet
            aliquam. Placerat vestibulum lectus mauris ultrices eros. Leo
            integer malesuada nunc vel risus commodo viverra maecenas. Convallis
            convallis tellus id interdum. Vitae elementum curabitur vitae nunc.
            Malesuada fames ac turpis egestas maecenas pharetra convallis
            posuere morbi. Eget nulla facilisi etiam dignissim diam. Nunc congue
            nisi vitae suscipit tellus mauris. Sed faucibus turpis in eu mi. Non
            nisi est sit amet facilisis. Porttitor leo a diam sollicitudin
            tempor id eu. Nunc vel risus commodo viverra maecenas accumsan.
            Aliquam purus sit amet luctus venenatis lectus magna fringilla.
            Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Nec
            feugiat in fermentum posuere urna nec tincidunt praesent. Augue
            lacus viverra vitae congue eu consequat. Ultricies mi quis hendrerit
            dolor magna eget est lorem. Mattis pellentesque id nibh tortor id
            aliquet lectus proin nibh. Magna fermentum iaculis eu non diam
            phasellus vestibulum lorem. Nunc id cursus metus aliquam eleifend mi
            in nulla. Elit ut aliquam purus sit amet luctus venenatis. Lobortis
            scelerisque fermentum dui faucibus in ornare quam viverra. Arcu
            risus quis varius quam quisque. Libero nunc consequat interdum
            varius sit amet mattis vulputate enim. Ut enim blandit volutpat
            maecenas. Sed velit dignissim sodales ut eu. Adipiscing tristique
            risus nec feugiat in fermentum posuere. Velit egestas dui id ornare.
            Et malesuada fames ac turpis egestas integer. Vulputate enim nulla
            aliquet porttitor. Nunc mi ipsum faucibus vitae aliquet nec
            ullamcorper sit amet. Dolor sit amet consectetur adipiscing. Sed
            augue lacus viverra vitae congue eu. Arcu non odio euismod lacinia
            at quis risus sed vulputate. Auctor neque vitae tempus quam
            pellentesque nec nam. In eu mi bibendum neque egestas congue
            quisque. Augue mauris augue neque gravida in. Purus in mollis nunc
            sed id. Turpis in eu mi bibendum. Sit amet facilisis magna etiam
            tempor orci eu lobortis elementum. Nunc faucibus a pellentesque sit.
            Sed vulputate mi sit amet mauris. Tempor orci eu lobortis elementum
            nibh tellus molestie nunc. In cursus turpis massa tincidunt dui.
            Turpis egestas maecenas pharetra convallis. Dui accumsan sit amet
            nulla. Faucibus purus in massa tempor nec. Enim facilisis gravida
            neque convallis. Etiam erat velit scelerisque in dictum non.
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
