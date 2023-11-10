import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
export default function LeftNavBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const sidebarNavItems = [
        {
            display: 'Thống kê',
            icon: <i className='bx bx-home'></i>,
            to: '/admin/statistic',
            section: 'statistic',
        },
        {
            display: 'Duyệt bài',
            icon: <i className='bx bx-star'></i>,
            to: '/admin/approve',
            section: 'approve'
        },
        
       
        {
            display: 'Quản lý phim',
            icon: <i className='bx bx-calendar'></i>,
            to: '/admin/movie',
            section: 'movie'
        },
        {
            display: 'User',
            icon: <i className='bx bx-user'></i>,
            to: '/user',
            section: 'user'
        },
        {
            display: 'Orders',
            icon: <i className='bx bx-receipt'></i>,
            to: '/order',
            section: 'order'
        },
    ]

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2];
        // console.log(curPath)
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath?.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Animate
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
}
