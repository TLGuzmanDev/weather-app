import React from 'react';

const Error = (props) => {
  if (props.message) {
    return (
      <div id="error">
        <p>{`ERROR: ${props.message.toUpperCase()}`}</p>
      </div>
    );
  } else {
    return <div id="error"></div>;
  }
};

export default Error;
