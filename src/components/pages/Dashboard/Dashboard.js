import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';

import { BsListCheck } from 'react-icons/bs';
import { FaUserEdit, FaRegCalendarCheck, FaRegComments } from 'react-icons/fa';
import { MdEmail, MdPeopleAlt } from 'react-icons/md';
import { AiOutlineAreaChart, AiOutlineFileAdd } from 'react-icons/ai';
import DashboardMenu from './DashboardMenu';
import HamburgerMenu from '../../navigation/HamburgerMenu/HamburgerMenu';
import { useMenuContext } from '../../../contexts/MenuContext';

function Dashboard() {
  const { showMenu, setShowMenu } = useMenuContext();

  const handleOverlayClick = () => setShowMenu(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowMenu(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setShowMenu]);

  return (
    <div className='dashboard'>
      {showMenu && (
        <div
          className='sidebar-overlay'
          style={{ display: 'block' }}
          onClick={handleOverlayClick}
          aria-hidden='true'
        />
      )}

      <div className={`left-menu shadow${showMenu ? ' is-open' : ''}`}>
        <h5>MAIN</h5>
        <DashboardMenu
          name='Dashboard'
          link=''
          icon={<AiOutlineAreaChart />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='Edit Profile'
          link='edit_profile'
          icon={<FaUserEdit />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='Messages'
          link='#'
          icon={<MdEmail />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='Agent List'
          link='#'
          icon={<MdPeopleAlt />}
          setShowMenu={setShowMenu}
        />
        <h5>LISTINGS</h5>
        <DashboardMenu
          name='My Listings'
          link=''
          icon={<BsListCheck />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='New Listing'
          link='new_listing'
          icon={<AiOutlineFileAdd />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='Bookings'
          link='#'
          icon={<FaRegCalendarCheck />}
          setShowMenu={setShowMenu}
        />
        <DashboardMenu
          name='Reviews'
          link='#'
          icon={<FaRegComments />}
          setShowMenu={setShowMenu}
        />
        <div className='copyright-text text-small text-dark-blue'>
          &copy; MBOAHUB 2026.
        </div>
      </div>

      <div className='dashboard-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
