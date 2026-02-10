import React, { useContext } from 'react';
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
  const { showMenu } = useMenuContext();

  return (
    <div className='dashboard'>
      {showMenu && <HamburgerMenu />}
      <div className='left-menu shadow'>
        <h5>MAIN</h5>
        <DashboardMenu name='Dashboard' link='' icon={<AiOutlineAreaChart />} />
        <DashboardMenu
          name='Edit Profile'
          link='edit_profile'
          icon={<FaUserEdit />}
        />
        <DashboardMenu name='Messages' link='#' icon={<MdEmail />} />
        <DashboardMenu name='Agent List' link='#' icon={<MdPeopleAlt />} />
        <h5>LISTINGS</h5>
        <DashboardMenu name='My Listings' link='' icon={<BsListCheck />} />
        <DashboardMenu
          name='New Listing'
          link='new_listing'
          icon={<AiOutlineFileAdd />}
        />
        <DashboardMenu name='Bookings' link='#' icon={<FaRegCalendarCheck />} />
        <DashboardMenu name='Reviews' link='#' icon={<FaRegComments />} />
        <div className='text-small text-dark-blue'>&copy;MBOAHUB 2026.</div>
      </div>
      <div className='dashboard-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
