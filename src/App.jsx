import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveTOLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTOLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTOLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveTOLS();
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
    saveTOLS();
  };

  return (
    <>
      <Navbar />
      <div className="  mx-3 md:container md:mx-auto bg-blue-200 my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2">
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="font-bold text-2xl  ">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd} disabled= {todo.length<=1}
            className="bg-blue-600 hover:bg-blue-800 disabled:bg-blue-400 text-white p-2 py-1 text-sm font-bold  rounded-md"
          >
            Add
          </button>
        </div> 
        <input className="my-4
        " onChange={toggleFinished} type="checkbox" checked={showFinished} />Finished Todos
        <h2 className="font-bold text-2xl ">Your Todos</h2>
        <div className="todos">
          {todos.map((item) => {
            return(showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex md:w-[75%] my-3 justify-between"  
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox" checked={item.isCompleted}
                  />
            
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-800 text-white p-2 py-1 text-sm font-bold mx-1 rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-800 text-white p-2 py-1 text-sm font-bold mx-1 rounded-md"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
