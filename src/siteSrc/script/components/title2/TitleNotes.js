import React from 'react';
import PropTypes from 'prop-types';

const TitleNotes = (props) => {
  return (
    <div className='title-notes container'>
      <div className='row'>
        <div className='col-md'>
          <textarea placeholder='Add any notes here...' />
        </div>
      </div>
    </div>
  );
}

TitleNotes.propTypes = {
};

export default TitleNotes;
