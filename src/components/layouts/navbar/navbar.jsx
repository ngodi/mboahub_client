import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import Logo from '../../common/Logo/Logo';
import './navbar.scss';
import { ADMIN_DASHBOARD_URL, HOME_URL, SIGNIN_PATH } from '../../../routes/frontend';
import WhatsApp from '../../libs/WhatsApp/WhatsApp';
import { UserContext } from '../../../contexts/UserContext';

export default function Navbar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav className="fixed-top">
      <Logo />
      <div>
        <div className="nav-contact">
          <span className="ml-4">
            <AiOutlinePhone size={20} />
            {' '}
            +(237) 672123230
          </span>
            &nbsp;&nbsp;
          <span className="ml-4">
            <AiOutlineMail size={20} />
            {' '}
            info@mboahub.com
          </span>
          <WhatsApp phone="672378393" text="Chat With Us" />
        </div>
        <ul>
          <li className="nav-content">
            <Link to={HOME_URL} className="nav-link active" aria-current="page">Home</Link>
          </li>
          {
            isLoggedIn
              ? (
                <li>
                  <Link
                    to={ADMIN_DASHBOARD_URL}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </li>
              )
              : (
                <li>
                  <Link to={SIGNIN_PATH} className="nav-link active" aria-current="page">Login</Link>
                </li>
              )
          }
        </ul>
      </div>
    </nav>
  );
}
