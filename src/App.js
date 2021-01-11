import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editID, setEditID] = useState(null);
  const [editing, setEditing] = useState({
    isEditing: false,
    ID: null,
  });

  const [alert, setAlert] = useState({
    isAlert: false,
    msg: "",
    type: null,
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setList(items);
    }
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();

    if (!value) {
      setAlert({
        isAlert: true,
        msg: "please enter value",
        type: "danger",
      });
      return;
    }

    if (!editing.isEditing) {
      setList((prevState) => [...prevState, value]);
      setAlert({
        isAlert: true,
        msg: "Added",
        type: "success",
      });
      const localData = JSON.parse(localStorage.getItem("items")) || [];
      localData.unshift(value);
      localStorage.setItem("items", JSON.stringify(localData));
    } else {
      let edited = list.map((item, i) => {
        if (i !== editing.ID) return item;
        else return value;
      });
      localStorage.setItem("items", JSON.stringify(edited));
      setList(edited);

      setEditing({ isEditing: false, ID: null });
      setAlert({
        isAlert: true,
        msg: "Edited",
        type: "success",
      });
    }
    setValue("");
  };

  const deleteItem = (id) => {
    setList((prevState) => {
      return prevState.filter((_, i) => i !== id);
    });
    setAlert({
      isAlert: true,
      msg: "Deleted",
      type: "danger",
    });
  };

  const editItem = (id) => {
    setEditing({
      isEditing: true,
      ID: id,
    });
    setValue(list[id]);
  };

  const clearAll = () => {
    setList([]);
    localStorage.setItem("items", JSON.stringify([]));
  };

  return (
    <section className="section-center">
      {alert.isAlert && (
        <Alert
          {...alert}
          list={list}
          removeAlert={() => {
            setAlert({
              isAlert: false,
              msg: "",
              type: null,
            });
          }}
        />
      )}
      <form className="grocery-form">
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs"
            className="grocery"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn" onClick={clickHandler}>
            submit
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <div className="grocery-list">
          <List del={deleteItem} edit={editItem} list={list} />
        </div>
        {list.length ? (
          <button className="clear-btn" onClick={clearAll}>
            clear items
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default App;
