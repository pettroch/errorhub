import { redirect } from "react-router-dom";
import { fetches } from "./helpers/request";

interface AuthProvider {
  getIsAuthenticated: () => boolean;
  getId: () => null | number;
  getName: () => null | string;
  getLogin: () => null | string;
  getRole: () => null | 'Пользователь' | 'Оператор' | string;
  signin(login: string, password: string): Promise<string | void>;
  signout(): Promise<unknown>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
  getIsAuthenticated: () => localStorage.getItem('isAuthenticated') == 'true' ? true : false,
  getId: () => Number(localStorage.getItem('user_id')),
  getName: () => String(localStorage.getItem('name')),
  getLogin: () => localStorage.getItem('login'),
  getRole: () =>  localStorage.getItem('role'),
  async signin(login: string, password: string) {
    const result = await fetches.auth(login, password)

    if (result.result == true) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_id', result.user?.id ? String(result.user?.id) : '');
      localStorage.setItem('login', login);
      localStorage.setItem('name', result.user?.name ? result.user?.name : '');
      localStorage.setItem('role', result.user?.role.name ? result.user?.role.name : '');

      console.log(result)
    } else {
      console.log(result)
      return result.error
    }

  },
  async signout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');

    return redirect("/login");
  },
};

export function protectedLoader() {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.getIsAuthenticated()) {
    return redirect("/login");
  }
  return { user: fakeAuthProvider.getLogin() };
}