import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import './index.css'
import { ErrorPage } from './pages/ErrorPage.tsx';
import { fakeAuthProvider, protectedLoader } from './auth.ts';
import { redirect } from "react-router-dom";
import { LoginPage } from './pages/LoginPage.tsx';
import { CardsPage } from './pages/CardsPage.tsx';
import { CreateCardPage } from './pages/CreateCardPage.tsx';
import { CardPage } from './pages/CardPage.tsx';

export const routes = {
  login: '/login',
  logout: '/logout',
  // cards: 'cards',
  card: 'card/:id',
  createCard: 'create-card'
} 

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return protectedLoader();
    },
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        index: true,
        element: <CardsPage />,
      },
      {
        path: 'card/:id',
        element: <CardPage />,

      },
      {
        path: routes.createCard,
        element: <CreateCardPage />
      }
    ],
  },
  {
    path: routes.login,
    loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: routes.logout,
    async loader() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      return await fakeAuthProvider.signout();
    },
  },
]);

async function loginLoader() {
  if (fakeAuthProvider.getIsAuthenticated()) {
    return redirect("/");
  }
  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
