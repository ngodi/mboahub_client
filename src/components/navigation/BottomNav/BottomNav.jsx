/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineMenuOpen, MdRealEstateAgent } from 'react-icons/md';
import './styles.css';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../../contexts/UserContext';
import { HOME_URL, PROPERTIES_URL } from '../../../routes/frontend';
// import { MenuContext } from '../../../contexts/MenuContext';
// import { inLocation } from '../../../utils/functions';

const BottomNav = () =>
// const { isLoggedIn } = useContext(UserContext);
// const { setShowMenu } = useContext(MenuContext);
// const handleShowMenu = () => {
//   if (inLocation(ADMIN_DASHBOARD_URL)) {
//     setShowMenu(true);
//   }
// };
  (
    <nav className="bottom-nav">
      <ul>
        <li>
          <Link to={HOME_URL}>
            <FaHome size={30} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to={PROPERTIES_URL}>
            <MdRealEstateAgent size={30} />
            <span>Properties</span>
          </Link>
        </li>
        <li className="signin-wrapper">
          <Link to="#">
            <MdOutlineMenuOpen size={30} />
            <span>Menu</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
export default BottomNav;
