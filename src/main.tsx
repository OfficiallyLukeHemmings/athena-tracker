import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/error-page'
import LoginPage from './routes/loginPage'
import GamesPage from './routes/gamesPage'
import ResultsPage from './routes/resultsPage'
import { paramsLoader } from './paramsLoader'
import RegisterPage from './routes/registerPage'
import ResetPasswordPage from './routes/resetPasswordPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <GamesPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path:"/:game/results",
    element: <ResultsPage/>,
    errorElement: <ErrorPage/>,
    loader: paramsLoader,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/reset",
    element: <ResetPasswordPage/>,
    errorElement: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
