import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import { SideNav } from './SideNav.js';
import { Tutorial } from './Tutorial.js';
import data from './word-bank.json';

function TopNav() {

    const styles = {
        top: "w3-top",
        navBot: "nav-bot",
        topLeft: "w3-top-left",
        topRight: "w3-top-right",
        topBtn: "top-button",
        links: "w3-links",
        title: "w3-title",
        close: "close"
    }

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar);

        if (!sidebar) {
            document.getElementById('nav-bar').style.pointerEvents = 'none';
        }else{
            document.getElementById('nav-bar').style.pointerEvents = 'auto';
        }
    }

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    };
    
    var randWord = data;

    const randomWorl = () => {
        var temp1 = randWord[Math.floor(Math.random()*data.length)];
        document.getElementById("randomWord").innerHTML = temp1;
    }

    return(
        <>
            <div className={`${styles.top} ${styles.navBot}`} style={{padding: '0px 16px'}} id='nav-bar'>
                <div className={`${styles.topLeft}`}>
                    <Link to='#' className={`${styles.topBtn}`}><FaIcons.FaBars style={{cursor: 'pointer'}} onClick={showSidebar}/>
                        <span className={`${styles.links}`}>About Me</span>
                    </Link>
                    <div>
                        <div className={`${styles.topBtn}`}><FaIcons.FaInfoCircle style={{cursor: 'pointer'}} onClick={openModal}/></div>
                        <Tutorial showModal={showModal} setShowModal={setShowModal} />
                    </div>
                </div>
                <div className={`${styles.title}`}>Wordel</div>
                <div className={`${styles.topRight}`} style={{cursor: 'pointer'}} onClick={randomWorl}>Other</div>
            </div>

            <div id='randomWord'>
            </div>

            <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
                <ul className='sidebar-items' style={{padding: '0px 16px'}}>
                    <li className='sidebar-toggle'>
                        <button to='#' className={`${styles.topBtn} ${styles.close}`}>
                            <AiIcons.AiOutlineCloseCircle style={{cursor: 'pointer'}} onClick={showSidebar}/>
                        </button>
                    </li>
                    {SideNav.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default TopNav;