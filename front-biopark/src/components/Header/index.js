import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-second-form.svg';
import Logout from '../../assets/logout.svg';
import Profile from '../../assets/profile.svg';
import { clear, getItem } from '../../utils/storage';
import './styles.css';

function Header({ handleEditProfile }) {
  const navigate = useNavigate();
  const userName = getItem('userName');

  function handleLogout() {
    clear();
    navigate('/');
  }

  return (

    <header className='move'>
      <div className='width-limit content-header'>
        <a href={'https://www.instagram.com/biopark_/'}>
          <img src={Logo} alt="logo" />
        </a>

        <div className='container-sign-out'>
          <div
            className='profile-area'
            onClick={handleEditProfile}
          >
            <img src={Profile} alt="profile" />
            <strong>{userName}</strong>
          </div>
          <img
            src={Logout}
            alt="logout"
            className='sign-out'
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>

  )
}

export default Header;