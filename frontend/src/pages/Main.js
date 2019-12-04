import React from 'react';
import PropTypes from 'prop-types';
import Bestsellers from '../components/Bestsellers';
import CatalogComponent from '../components/CatalogComponent';

const Main = (props) => (
  <>
    <Bestsellers />
    <CatalogComponent />
  </>
);

Main.propTypes = {

};

export default Main;
