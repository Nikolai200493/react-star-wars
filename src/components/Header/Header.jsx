import Favourite from '../Favourite/Favourite'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import imgDroid from './img/droid.svg'
import imgLightsaber from './img/lightsaber.svg'
import imgSpaceStation from './img/space-station.svg'
import {
  useTheme,
  THEME_LIGHT,
  THEME_DARK,
  THEME_NEITRAL
} from '@context/ThemeProvider'
import { useEffect, useState } from 'react'

const Header = () => {
  const [icon, setIcon] = useState(imgSpaceStation)
  const isTheme = useTheme()

  useEffect(() => {
    switch (isTheme.theme) {
      case THEME_LIGHT:
        setIcon(imgLightsaber)
        break
      case THEME_DARK:
        setIcon(imgSpaceStation)
        break
      case THEME_NEITRAL:
        setIcon(imgDroid)
        break
      default:
        setIcon(imgSpaceStation)
    }
  }, [isTheme])

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={icon} alt="Star Wars" />
      <ul className={styles.list__container}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/people/?page=1">People</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/not-found">Not found</NavLink>
        </li>
        <li>
          <NavLink to="/fail">Fail</NavLink>
        </li>
      </ul>
      <Favourite />
    </div>
  )
}

export default Header
