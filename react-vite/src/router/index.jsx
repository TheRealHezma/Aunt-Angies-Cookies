import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CookiesHome from '../components/CookiesPages/CookiesHome';
import CookiesDescription from '../components/CookiesPages/CookiesDescription';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
        element: <CookiesHome />
      },
      {
        path: "cookies/:id",
        element: <CookiesDescription />
      }
    ],
  },
]);
