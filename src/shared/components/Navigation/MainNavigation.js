import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SiteDrawer from './SiteDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };
    return (
        <>
            {drawerIsOpen ? (<Backdrop onClick={ closeDrawerHandler} />) : null}
            <SiteDrawer show={drawerIsOpen} onClick={ closeDrawerHandler}>
                <nav className='main_navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SiteDrawer>
            
      
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'> YourPlaces</Link>
                </h1>

                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
  )
}

export default MainNavigation