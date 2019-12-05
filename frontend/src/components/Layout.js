import React from 'react';
import PropTypes from 'prop-types';
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

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
