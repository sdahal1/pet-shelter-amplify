import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from "../assets/logo.jpeg";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator();

  function handleSignOut(e) {
    e.preventDefault();
    signOut();
    navigate('/')
  }

  return (
    <header className='site-header col flex-center'>
      <div className='row'>
        <img className='logo' src={logo} alt='' />
        <h1 className='text-center'><NavLink to='/'>Example Organization Pet Shelter</NavLink></h1>
      </div>
      <nav className='site-nav'>
        <ul className='row'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About us</NavLink></li>
          <li><NavLink to='/pets' end>Pets</NavLink></li>
          {/* Logged in users don't need to see Adopt link */}
          {!user && <li><NavLink to='/adopt'>Adopt</NavLink></li>}
          {/* Only logged in users can see the Create pet link */}
          {!!user && <li><NavLink to='/pets/create'>Create pet</NavLink></li>}
          {/* Only logged in users can see the Applications link */}
          {!!user && <li><NavLink to='/applications'>Manage applications</NavLink></li>}
          {/* If there is no logged in user, they see a Log in NavLink. If there is a user, they see the Sign out button */}
          <li>
            {!user ?
              <NavLink className='btn' to='/login'>Log in</NavLink> :
              <button className='btn btn-black' onClick={handleSignOut}>
                Sign out
              </button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
