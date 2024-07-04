import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const saveTodoLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveTodoLs();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveTodoLs();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveTodoLs();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodoLs();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounder-xl p-5 bg-violet-100 min-h-[70vh] md:w-1/2">
        <h1 className="font-bold text-center text-2xl">Your Tasks</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className="text-xl font-bold">Add Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-600 disabled:bg-violet-950 hover:bg-violet-900 text-white rounded-md px-3 py-1 mx-2"
            >
              Add
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
        />{" "}
        Show Findisehd
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className="m-5 font-bold"> No Todos </div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between  my-4">
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-600 hover:bg-violet-900 text-white rounded-md px-3 py-1 mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-600 hover:bg-violet-900 text-white rounded-md px-3 py-1 mx-2"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
