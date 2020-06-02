import React from 'react';

const Error = ({ message }) => {
  if (message) {
    return (
      <div id="error">
        <p>{`ERROR: ${message.toUpperCase()}`}</p>
      </div>
    );
  } else {
    return <div id="error"></div>;
  }
};

export default Error;
