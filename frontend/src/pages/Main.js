import React from 'react';
import PropTypes from 'prop-types';
import Bestsellers from '../components/Bestsellers';

const Main = props => {
  return (
    <>
    <Bestsellers />

      <section className="catalog">
          <h2 className="text-center">Каталог</h2>

          <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
      </section>
    </>
  );
};

Main.propTypes = {
  
};

export default Main;