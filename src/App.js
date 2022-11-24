import { useState } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [index, setIndex] = useState(-1);
  const [list, setList] = useState([]);

  const handleClick = () => {
    if (name === "") {
      return;
    }
    let a = [...list];
    let obj = {
      value: name,
      isDone: false,
    };
    if (index !== -1) {
      a.splice(index, 1, obj);
      setIndex(-1);
    } else {
      a.push(obj);
    }

    setList(a);
    setName("");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const removeItem = (selectedItem) => {
    const b = list.filter((item) => item !== selectedItem);
    setList(b);
  };
  const editItem = (selectedItem) => {
    setName(selectedItem.value);
    let index1 = list.findIndex((ele) => ele == selectedItem);
    setIndex(index1);
  };
  const checktask = () => {
    const result = list.filter((item) => item.isDone === false);
    return result.length;
  };
  const onDone = (item) => {
    let a = [...list];
    let index = a.findIndex((ele) => ele === item);
    a = a.filter((ele) => ele !== item);
    let obj1 = {
      value: item.value,
      isDone: true,
    };
    a.splice(index, 0, obj1);
    setList(a);
  };

  const clearAll = () => {
    setList([]);
  };

  const TodoItem = ({ item, index }) => {
    return (
      <div key={item.value + index} className="container">
        <div class="item">
          {item.isDone ? (
            <del>
              <input type="radio" checked />
              {item.value}
            </del>
          ) : (
            <p
              onClick={() => {
                onDone(item);
              }}
            >
              <input type="radio" />
              {item.value}
            </p>
          )}
        </div>
        <div className="buttons">
          <div>
            <p
              className="pointerClass"
              onClick={() => {
                editItem(item);
              }}
            >
              &#9998;
            </p>
          </div>
          <div>
            <i
              className="pointerClass fa fa-trash"
              onClick={() => {
                removeItem(item);
              }}
            ></i>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="heading">Todo App</div>
      <div className="App-header">
        <div>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder=" Add your new todo"
            id="input"
          />
        </div>
        <div>
          {index !== -1 ? (
            <p className="b1" onClick={handleClick}>
              {" "}
              &#10003;
            </p>
          ) : (
            <p className="b1" onClick={handleClick}>
              &#10010;
            </p>
          )}
        </div>
      </div>
      <div className="list">
        {list.map((item, index) => (
          <TodoItem item={item} index={index} />
        ))}
      </div>
      <div className="review">
        <div>You have {checktask()} pending tasks</div>
        <div className="button pointerClass" onClick={clearAll}>
          Clear All
        </div>
      </div>
    </div>
  );
}

export default App;
