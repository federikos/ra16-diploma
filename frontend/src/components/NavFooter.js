import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const links = [
  {
    title: 'Каталог',
    to: '/catalog'
  },
  {
    title: 'О магазине',
    to: '/about'
  },
  {
    title: 'Контакты',
    to: '/contacts'
  },
];

function isActive(location, to) {
  if (!location) return false;
  return location.pathname === to;
}

const NavFooter = props => {
  return (
    <ul className="nav flex-column">
      {
        links.map((link, i) => {
          return (
            <li className={clsx("nav-item", isActive(props.location, link.to) && 'active')} key={i}>
              <Link className="nav-link" to={link.to}>
                {link.title}
              </Link>
            </li>
          )
        })
      }
    </ul>
  );
};

NavFooter.propTypes = {
  
};

export default withRouter(NavFooter);