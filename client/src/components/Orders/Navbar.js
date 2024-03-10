import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/fetch.hook';

import avatar from '../../assets/profile.png';

import { googleLogout } from '@react-oauth/google';


export default function Navbar() {
  const navigate = useNavigate()

  // logout handler function
function userLogout(){
  googleLogout();
  localStorage.removeItem('token');
  navigate('/login')
}

const [{ apiData }] = useFetch();


  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4 bg-info'>
      <ul>
        <li>{apiData?.firstName}</li>
        <li>{apiData?.email}</li>
      </ul>

<ul className='d-flex'>
<li className='mx-3'>GrandTotal</li>
   <li><a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   
   <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={apiData?.profile || avatar}
                        alt=""
                      />
                    </button>
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><button onClick={userLogout} class="dropdown-item" >Logout</button></li>
          </ul>
          </li>
          
          </ul>

          
  
  </div>

    
  )
}
