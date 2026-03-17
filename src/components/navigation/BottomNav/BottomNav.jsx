import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineMenuOpen, MdRealEstateAgent } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './styles.css';
import { HOME_URL, PROPERTIES_URL } from '../../../routes/frontend';
import { useMenuContext } from '../../../contexts/MenuContext';

const BottomNav = () => {
  const { setShowMenu } = useMenuContext();

  return (
    <nav className='bottom-nav'>
      <ul>
        <li>
          <NavLink
            to={HOME_URL}
            end
            className={({ isActive }) =>
              isActive ? 'bottom-nav-link active' : 'bottom-nav-link'
            }
          >
            <FaHome size={26} />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={PROPERTIES_URL}
            className={({ isActive }) =>
              isActive ? 'bottom-nav-link active' : 'bottom-nav-link'
            }
          >
            <MdRealEstateAgent size={26} />
            <span>Properties</span>
          </NavLink>
        </li>

        <li>
          <button
            type='button'
            className='bottom-nav-link bottom-nav-btn'
            onClick={() => setShowMenu(true)}
            aria-label='Open menu'
          >
            <MdOutlineMenuOpen size={26} />
            <span>Menu</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
