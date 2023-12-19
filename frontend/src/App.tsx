import './App.css'
import { Link, Outlet, useLocation} from 'react-router-dom'
import { Input } from './components/ui/input'
import { routes } from './main'
import { fakeAuthProvider } from './auth'

function App() {
  const location = useLocation();
  const login = fakeAuthProvider.getLogin()
  const role = fakeAuthProvider.getRole()

  return (
    // <div className="">
    <div className='bg-slate-200 h-full min-h-screen flex flex-col items-center'>
      <div className="w-full flex  justify-center lg:justify-between bg-white py-4 lg:py-6 lg:px-12 shadow-md">
        <div className="h-full flex justify-center lg:justify-between items-center">
          <Link to='/'>
            <div className="mx-2 lg:mx-16 text-base lg:text-3xl text-center font-bold">ErrorHub</div>
          </Link>
          <nav
            className={"h-full flex items-center space-x-2 lg:space-x-6"}
          >
            <Link
              to='/'
              className={`text-xs lg:text-xl font-medium transition-colors hover:text-primary ${location.pathname == '/' ? 'border-b-blue-700 border-b-2' : ''}`}
            >
              Мои заявки
            </Link>
            <Link
              to={routes.createCard}
              className={`text-xs lg:text-xl  font-medium transition-colors  ${location.pathname == `/${routes.createCard}` ? 'border-b-blue-700 border-b-2' : ''}`}
            >
              Создать заявку
            </Link>
          </nav>
        </div>

        <div className="flex justify-between items-center gap-2 lg:gap-8">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px] hidden lg:block"
          />

          <div className="flex flex-col lg:flex-row relative items-center">
            <div className='font-bold mr-2 '>
              {login}
            </div>
            <div className="text-xs lg:text-sm font-medium text-muted-foreground ">
              ({role})
            </div>
          </div>
          <Link
            to={routes.logout}
            className="text-xs lg:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Logout
            {/* {`=>`} */}
          </Link>
        </div>
      </div>


      <div className="flex w-full h-full justify-center pt-[3%] 3x:pt-[5%]">
        <Outlet />
      </div>
      </div>
    // </div>
  )
}

export default App
