import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
        <div className="nav-wrapper">
            <Link to={'/'} className="brand-logo center">Kristine's Coffee Shop</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
            </ul>
        </div>
    </nav>
)

export default Header;