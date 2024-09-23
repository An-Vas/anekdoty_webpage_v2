import React, { useState } from 'react';

function Edit({id, text, onSave, onClose }) {
  const [editedText, setEditedText] = useState(text);

  const handleSave = () => {
    onSave(id, editedText);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          cols="100"
        />
        <div>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;