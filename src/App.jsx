import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("DB"))
      ? JSON.parse(localStorage.getItem("DB"))
      : []
  );
  localStorage.setItem("DB", JSON.stringify(data));

  const [inputValue, setInputValue] = useState();
  const [itemID, setItemID] = useState();

  // Delete item function
  const delDB = (id) => {
    const filteredData = data.filter((item) => {
      return id != item.id;
    });
    setData([...filteredData]);
  };
  const [editing, setEditing] = useState(false);
  // Edit item function
  const editDB = async (id) => {
    const filteredEditData = data.filter((item) => {
      return id == item.id;
    });
    setItemID(id);
    console.log(filteredEditData);
    setInputValue(filteredEditData[0].name);
  };
  return (
    <>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) {
              data.map((item) => {
                if (item.id == itemID) {
                  item.name = inputValue;
                }
              });
            } else {
              const obj = {
                id: Math.floor(Math.random() * 10000),
                name: inputValue,
              };
              setData([...data, obj]);
            }

            localStorage.setItem("DB", JSON.stringify(data));
            setInputValue("");
          }}
          className="form"
        >
          <input
            value={inputValue}
            onInput={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            className="inputText"
          />
          <button className="add">
            <i className="fa-solid fa-plus"></i>
          </button>
        </form>

        <div className="block">
          <ol className="todoList">
            {data.map((item) => {
              return (
                <li className="list">
                  {item.name}
                  <div className="btns">
                    <button
                      onClick={() => {
                        editDB(item.id);
                        setEditing(true);
                      }}
                      className="trash"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => {
                        delDB(item.id);
                      }}
                      className="trash"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
