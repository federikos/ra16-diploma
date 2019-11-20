import React from 'react';
import PropTypes from 'prop-types';

const NotFound = props => {
  return (
    <>
      {/* <Banner /> */}

      <section className="top-sales">
          <h2 className="text-center">Страница не найдена</h2>
          <p>
              Извините, такая страница не найдена!
          </p>
      </section>
    </>
  );
};

NotFound.propTypes = {
  
};

export default NotFound;