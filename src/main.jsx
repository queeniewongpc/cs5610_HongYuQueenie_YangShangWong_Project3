import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserPage from './UserPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './Login.jsx';
import Registration from './Registration.jsx'
import Homepage from './Homepage.jsx'

const router = createBrowserRouter([
  /*
  {
    path: "/",
    element: <App />,
  },
  */
  {
    path: '/home',
    element: <Homepage />
  },
  // {
  //   path: '/home/:username', 
  //   element: <Homepage />
  // },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/registration',
    element: <Registration />
  },

  {
    path: '/:owner',
    element: <UserPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
