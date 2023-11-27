import PropTypes from 'prop-types'
import styles from './PersonPage.module.css'
import { useParams } from 'react-router'
import React, { useEffect, useState, Suspense } from 'react'
import { getApiResource } from '@utils/network'
import { API_PERSON } from '@constants/api'
import { withErrorApi } from '@hoc-helpers/withErrorApi'
import { getPeopleImage } from '@services/getPeopleData'
import PersonPhoto from '@components/PersonPage/PersonPhoto'
import PersonInfo from '@components/PersonPage/PersonInfo'
import PersonLinkBack from '@components/PersonPage/PersonLinkBack'
import UiLoading from '@components/UI/UiLoading'
import { useSelector } from 'react-redux'

const PersonFilms = React.lazy(() =>
  import('@components/PersonPage/PersonFilms')
)

const PersonPage = ({ setErrorApi }) => {
  const [personInfo, setPersonInfo] = useState(null)
  const [personName, setPersonName] = useState(null)
  const [personPhoto, setPersonPhoto] = useState(null)
  const [personFilms, setPersonFilms] = useState(null)
  const [personId, setPersonId] = useState(null)
  const [personFavourite, setPersonFavourite] = useState(false)

  const { id } = useParams()

  const storeData = useSelector((state) => state.favouriteReducer)

  useEffect(() => {
    ;(async () => {
      const res = await getApiResource(`${API_PERSON}/${id}/`)

      storeData[id] ? setPersonFavourite(true) : setPersonFavourite(false)

      setPersonId(id)

      if (res) {
        setPersonInfo([
          { title: 'Height', data: res.height },
          { title: 'Mass', data: res.mass },
          { title: 'Skin Color', data: res.skin_color },
          { title: 'Heir Color', data: res.hair_color },
          { title: 'Eye Color', data: res.eye_color },
          { title: 'Birth Year', data: res.birth_year },
          { title: 'Gender', data: res.gender }
        ])
        setPersonName(res.name)
        setPersonPhoto(getPeopleImage(id))

        res.films.length && setPersonFilms(res.films)
      } else {
        setErrorApi(true)
      }
    })()
  }, [])

  return (
    <>
      <PersonLinkBack />

      <div className={styles.wrapper}>
        <span className={styles.person__name}>{personName}</span>

        <div className={styles.container}>
          {personPhoto && (
            <PersonPhoto
              personId={personId}
              personPhoto={personPhoto}
              personName={personName}
              personFavourite={personFavourite}
              setPersonFavourite={setPersonFavourite}
            />
          )}

          {personInfo && <PersonInfo personInfo={personInfo} />}

          {personFilms && (
            <Suspense fallback={<UiLoading theme="blue" isShadow />}>
              <PersonFilms personFilms={personFilms} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  )
}

PersonPage.propTypes = {
  setErrorApi: PropTypes.func
}

export default withErrorApi(PersonPage)
