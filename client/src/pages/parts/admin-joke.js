import React from 'react';

function AdminJoke({ text, id, index, onClick }) {

  return (

    <div className="text-block" data-id="1">
      <p className="text-block-body">{text}</p>
      <button className="text-block__edit-button" onClick={() => onClick(index)}>
        Изменить
      </button>
      <div className="text-block__id">{id}</div>
    </div>

  );
}

export default AdminJoke;