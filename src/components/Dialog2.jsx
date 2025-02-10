import React from "react";

const Is_Dialog = ({ id, title, children, onClose, onSubmit }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          {onSubmit && (
            <button
              type="submit"
              className="btn btn-success"
              onClick={onSubmit}
            >
              Submit
            </button>
          )}
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Is_Dialog;
