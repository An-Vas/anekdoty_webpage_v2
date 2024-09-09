import React from 'react';

function Joke({ text, id }) {

  return (

    <div className="text-block" data-id="1">
      <p className="text-block-body">{text}</p>
      <div className="text-block__id">{id}</div>
    </div>

  );
}

export default Joke;