import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, del, edit }) => {
  return list.map((item, index) => {
    return (
      <article className="grocery-item" key={index}>
        <p className="title">{item}</p>
        <div className="btn-container">
          <button className="edit-btn" onClick={() => edit(index)}>
            <FaEdit />
          </button>
          <button className="delete-btn" onClick={() => del(index)}>
            <FaTrash />
          </button>
        </div>
      </article>
    );
  });
};

export default List;
