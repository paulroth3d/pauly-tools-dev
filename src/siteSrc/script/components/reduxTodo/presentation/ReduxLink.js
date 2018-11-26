/**
 * A link to perform some action
 */

import React from 'react';
import PropTypes from 'prop-types';
 
const ReduxLink = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href=''
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
   );
 }
 
 ReduxLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
 };
 
 export default ReduxLink;
 