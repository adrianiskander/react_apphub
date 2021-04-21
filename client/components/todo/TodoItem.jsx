import React from 'react';


export default function TodoItem(props) {

  function handleDelete(event) {
    if ( ! window.confirm("Are you sure to delete this item?")) return;
    props.deleteItem(props.item.uid);
  }

  function toggleIsDone(event) {
    props.toggleItemIsDone(props.item.uid);
  }

  function setClassName() {
    if (props.item.isDone) {
      return "bg-success text-white";
    }
    return "bg-white";
  }

  return(
    <div className={setClassName() + " d-flex flex-column flex-sm-row justify-content-between mb-3 p-3 rounded shadow animated fadeInUp faster"}>
      <p className="m-sm-0">{props.item.text}</p>
      <div className="d-flex">
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        {
          props.item.isDone
            ? <button className="btn btn-sm btn-light ml-3" onClick={toggleIsDone}>Continue</button>
            : <button className="btn btn-sm btn-success ml-3" onClick={toggleIsDone}>Done</button>
        }
      </div>
    </div>
  );
}
