import React from 'react';
import PropTypes from 'prop-types';
import headerLogo from '../img/header-logo.png';
import banner from '../img/banner.jpg';
import Header from './Header';
import Footer from './Footer';
import Banner from './Banner';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {children}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

Header.propTypes = {

};

export default Layout;
