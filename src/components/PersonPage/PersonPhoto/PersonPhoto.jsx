import PropTypes from 'prop-types'
import styles from './PersonPhoto.module.css'
import { useDispatch } from 'react-redux'
import { removePersonFromFavourite, setPersonToFavourite } from '@store/actions'
import iconFavourite from './img/favourite.svg'
import iconFavouriteFill from './img/favourite-fill.svg'

const PersonPhoto = ({
  personId,
  personPhoto,
  personName,
  personFavourite,
  setPersonFavourite
}) => {
  const dispatch = useDispatch()

  const dispatchFavouritePeople = () => {
    if (personFavourite) {
      dispatch(removePersonFromFavourite(personId))

      setPersonFavourite(false)
    } else {
      dispatch(
        setPersonToFavourite({
          [personId]: {
            name: personName,
            img: personPhoto
          }
        })
      )

      setPersonFavourite(true)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <img className={styles.photo} src={personPhoto} alt={personName} />
        <img
          className={styles.favourite}
          src={personFavourite ? iconFavouriteFill : iconFavourite}
          onClick={dispatchFavouritePeople}
          alt="Add to favourite"
        />
      </div>
    </>
  )
}

PersonPhoto.propTypes = {
  personId: PropTypes.string,
  personPhoto: PropTypes.string,
  personName: PropTypes.string,
  personFavourite: PropTypes.bool,
  setPersonToFavourite: PropTypes.func
}

export default PersonPhoto
