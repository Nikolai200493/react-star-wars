import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routesConfig from '@routes/routesConfig'
import Header from '@components/Header'
import { REPO_NAME } from '@constants/repo'

const App = () => {
  return (
    <>
      <BrowserRouter basename={`/${REPO_NAME}/`}>
        <div className={styles.wrapper}>
          <Header />
          <Routes>
            {routesConfig.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.element} />
              )
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
