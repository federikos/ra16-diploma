import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import clsx from 'clsx';
import headerLogo from '../img/header-logo.png';
import PropTypes from 'prop-types';
import NavbarMain from './NavbarMain';

const Header = props => {
  const history = useHistory();
  const [searchInvisible, setSearchInvisible] = useState(true);
  const handleCartClick = () => history.push('/cart');
  const handleSearchClick = () => {
    setSearchInvisible(prevState => !prevState);
  };

  return (
    <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">
                        <img src={headerLogo} alt="Bosa Noga" />
                    </NavLink>

                    <div className="collapase navbar-collapse" id="navbarMain">
                      <NavbarMain />
                        <div>
                            <div className="header-controls-pics">
                                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSearchClick}></div>
                                {/* Do programmatic navigation on click to /cart */}
                                <div className="header-controls-pic header-controls-cart" onClick={handleCartClick}>
                                    <div className="header-controls-cart-full">1</div>
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                            <form data-id="search-form" className={clsx("header-controls-search-form", "form-inline", searchInvisible && "invisible")}>
                                <input className="form-control" placeholder="Поиск" />
                            </form>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    </header>
  );
};

Header.propTypes = {
  
};

export default Header;