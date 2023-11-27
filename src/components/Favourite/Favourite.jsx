import PropTypes from 'prop-types'
import styles from './Favourite.module.css'
import icon from './img/bookmark.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const Favourite = () => {
  const [count, setCount] = useState(0)

  const storeData = useSelector((state) => state.favouriteReducer)

  useEffect(() => {
    const length = Object.keys(storeData).length
    length.toString().length > 2 ? setCount('...') : setCount(length)

    setCount(length)
  })

  return (
    <div className={styles.container}>
      <Link to="/favourites">
        <span className={styles.counter}>{count}</span>
        <img src={icon} className={styles.icon} alt="Favourite" />
      </Link>
    </div>
  )
}

Favourite.propTypes = {
  // text: PropTypes.string
}

export default Favourite
