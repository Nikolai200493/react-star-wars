import PropTypes from 'prop-types'
import styles from './PeopleList.module.css'
import { Link } from 'react-router-dom'

const PeopleList = ({ people }) => {
  return (
    <ul className={styles.list__container}>
      {people.map(({ name, id, img }) => {
        return (
          <li key={id} className={styles.list__item}>
            <Link to={`/people/${id}`}>
              <img src={img} alt={name} className={styles.person__photo} />
              <p>{name}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

PeopleList.propTypes = {
  people: PropTypes.array
}

export default PeopleList
