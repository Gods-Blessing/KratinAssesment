import './Nav.css'

// importing image
import hamburgerIcon from '../../assets/more.png';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <div className='logo-container'>
        <Link to='/'>
          <h2>Helpper</h2>
        
        </Link>
      </div>

      <div className='page-navs'>
        <div className='page-links'>
          <Link to='/videocall'><p>Video Call</p></Link>
          <Link to='/'><p>Chat</p></Link>
        </div>

        <div className='hamburger-icon'>
          <img className='hamburger' src={hamburgerIcon}></img>
        </div>
      </div>
    </nav>
  )
}

export default Nav;