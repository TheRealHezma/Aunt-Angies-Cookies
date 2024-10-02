import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CookiesHome from '../components/CookiesPages/CookiesHome';
import CookiesDescription from '../components/CookiesPages/CookiesDescription';
import CreateCookieForm from '../components/CookiesPages/CreateCookieForm';
import EditCookieForm from '../components/CookiesPages/EditCookieForm'
import HomePage from '../components/HomePage/HomePgae';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "cookies",
        element: <CookiesHome />,
      },
      {
        path: "cookies/new", // New path for creating a cookie
        element: <CreateCookieForm />,
      },
      // {
      //   path: "/checkout",
      //   element:
      // },
      {
        path: "cookies/:id/edit",
        element: <EditCookieForm />
      },
      {
        path: "cookies/:id",
        element: <CookiesDescription />,
      },
    ],
  },
]);
