import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const links = [
  {
    title: 'Каталог',
    to: '/catalog',
  },
  {
    title: 'О магазине',
    to: '/about',
  },
  {
    title: 'Контакты',
    to: '/contacts',
  },
];

function isActive(location, to) {
  if (!location) return false;
  return location.pathname === to;
}

const NavFooter = ({ location }) => (
  <ul className="nav flex-column">
    {
        links.map((link) => (
          <li className={clsx('nav-item', isActive(location, link.to) && 'active')} key={link.title}>
            <Link className="nav-link" to={link.to}>
              {link.title}
            </Link>
          </li>
        ))
      }
  </ul>
);

NavFooter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(NavFooter);
