import React, {useContext} from 'react';
import './header.css'
import { IoNotificationsOutline, IoListSharp, IoMailOpenOutline } from "react-icons/io5";
import { CiLight, CiDark  } from "react-icons/ci";
import { ThemeContext } from '../../context/ThemeContext';
const Header = () => {
    const data = useContext(ThemeContext);
    const setThemeBg  = () => {
        data.setDark(prev => !prev)
    }
    return(
        <header style={{
            background: data.dark ? '#212631': '#fff',
            color: data.dark ? '#fff': '#212631'
        }}>
            <div className='header-sections-container'>
                <section className='header-section-one-main'>
                    <div className='header-section-one-sub'>
                        <p style={{margin: '0px 0px 0px 12px', fontSize: '22px'}}>Users</p>
                    </div>
                </section>
                <section className='header-section-two-main'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <IoNotificationsOutline size={22} style={{margin: '0px 6px 0px 6px'}} />
                        <IoListSharp size={22} style={{margin: '0px 6px 0px 6px'}} />
                        <IoMailOpenOutline size={22} style={{margin: '0px 6px 0px 6px'}} />
                    </div>
                    <div className='header-theme-change-card' onClick={setThemeBg}>
                        {data.dark ? 
                        <CiLight size={22}  /> : 
                        <CiDark size={22} /> }
                    </div>
                    <div className='header-profile-image-card'>
                        <img src='https://randomuser.me/img/creator_arron.png' className='header-profile-image' />
                    </div>
                </section>
            </div>
        </header>
    )
}

export default Header