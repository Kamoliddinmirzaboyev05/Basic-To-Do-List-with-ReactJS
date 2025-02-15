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

  const delDB = (id) => {
    const filteredData = data.filter((item) => {
      return id != item.id;
    });
    setData([...filteredData]);
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const obj = {
              id: Math.floor(Math.random() * 10000),
              name: inputValue,
            };
            setData([...data, obj]);
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
                    <button className="trash">
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
