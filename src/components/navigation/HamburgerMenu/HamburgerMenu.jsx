/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { AiOutlineAreaChart, AiOutlineFileAdd } from 'react-icons/ai';
import { FaRegCalendarCheck, FaRegComments, FaUserEdit } from 'react-icons/fa';
import { MdEmail, MdPeopleAlt } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
import { BsListCheck } from 'react-icons/bs';
import DashboardMenu from '../../pages/Dashboard/DashboardMenu';

import './HamburgerMenu.css';
import { useMenuContext } from '../../../contexts/MenuContext';

const HamburgerMenu = () => {
  const { setShowMenu } = useMenuContext();

  return (
    <div className='hamburger-menu'>
      <div className='d-flex-between-center'>
        <h5>MAIN</h5>
        <span onClick={() => setShowMenu(false)}>
          <IoMdCloseCircle size={30} />
        </span>
      </div>
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Dashboard'
        link=''
        icon={<AiOutlineAreaChart />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Edit Profile'
        link='edit_profile'
        icon={<FaUserEdit />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Messages'
        link=''
        icon={<MdEmail />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Agent List'
        link=''
        icon={<MdPeopleAlt />}
      />
      <h5>LISTINGS</h5>
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='My Listings'
        link='my_listings'
        icon={<BsListCheck />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='New Listing'
        link='new_listing'
        icon={<AiOutlineFileAdd />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Bookings'
        link=''
        icon={<FaRegCalendarCheck />}
      />
      <DashboardMenu
        setShowMenu={setShowMenu}
        name='Reviews'
        link=''
        icon={<FaRegComments />}
      />
      <div className='text-small text-dark-blue'>&copy;MBOAHUB 2026.</div>
    </div>
  );
};

export default HamburgerMenu;
