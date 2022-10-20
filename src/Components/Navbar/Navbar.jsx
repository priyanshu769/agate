import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart3, BsFillHeartFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import agateLogo from "../../Assets/Images/agateLogo.png"

export const Navbar = (props) => {
    const navigate = useNavigate()
    return (
        <nav className='navbar'>
            <div className='logoContainer'>
                <Link className="navLink" activeclassname="selectedNavPill" to="/">
                    <img className='logoImg' src={agateLogo} alt="Agate Logo" />
                </Link>
            </div>
            <div className='navBullets'>
                <button className='navBtn' onClick={() => navigate('/wishlist')}>
                    <BsFillHeartFill size={25} />
                    <span classname="navIconBadge">{props.wishlistNumber}</span>
                </button>
                <button className='navBtn' onClick={() => navigate('/cart')}>
                    <BsCart3 size={25} />
                    <span classname="navIconBadge">{props.cartNumber}</span>
                </button>
                <button className='navBtn' onClick={props.userClickHandle}>
                    <FaUserAlt size={25} />
                </button>
            </div>
        </nav>
    )
}
