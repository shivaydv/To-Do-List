import React, { useState, useEffect } from "react";
import { MdDeleteOutline, MdDeleteSweep } from "react-icons/md";

const App = () => {

//hooks
  

  const [inputvalue, setInputvalue] = useState();

  const [isChecked, setIsChecked] = useState(false);

  const [filteredList, setFilteredList] = useState("All");

  const [tasks, setTasks] = useState(() => {

    const savedTodos = localStorage.getItem("to_do_list-tasks");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }

  });

  useEffect(() => {

    localStorage.setItem("to_do_list-tasks", JSON.stringify(tasks));

  }, [tasks, isChecked]);



  // delete the single task
  const deleteTask = (itemsId) => {

    const newlist = tasks.filter((item) => item.id !== itemsId);
    setTasks(newlist);

  };

  //delete all completed Tasks
  const deleteCompleted = () => {

    const newlist = tasks.filter((item) => item.isCompleted === false);
    setTasks(newlist);

  };

  //runs add task function when enter key is pressed
  const handlepressedkey = (pressedkey) => {

    if (pressedkey === "Enter") addtask();

  };

  //add new task in the list
  const addtask = () => {

    if (!inputvalue) {
      alert("Please Enter the Value");
    } else if (inputvalue.length > 50) {
      alert("Task Name Must be Less than 50");
    } else {
      setTasks([
        {
          taskValue: inputvalue.charAt(0).toUpperCase() + inputvalue.slice(1),
          isCompleted: false,
          id: Date.now(),
        },
        ...tasks,
      ]);
      setInputvalue("");
    }
  };

  //return number the remaining task to complete
  const remainingTasks = () => {

    const newlist = tasks.filter((item) => item.isCompleted === false);
    return newlist.length;

  };

  //use to identify if task is completed or not
  const handlecheckbox = (id) => {

    setIsChecked(!isChecked);
    tasks.filter((item) => {
      item.id === id && (item.isCompleted = !item.isCompleted);
    });

  };

  // filter and show the list of tasks [completed , not completed ,all]
  const filterArray = () => {
    if (filteredList === "Active") {
      return tasks.filter((item) => item.isCompleted === false);
    } else if (filteredList === "Finished") {
      return tasks.filter((item) => item.isCompleted === true);
    } else {
      return tasks;
    }
  };

  return (
    <div className="bg-[#8aa7ff] flex  w-screen h-screen justify-center items-center overflow-hidden">
      <div
        className={`bg-[#ffffffef]  md:bg-white px-6 md:px-10 md:pt-6 md:pb-2 pt-6 pb-16 h-full w-full md:w-[60%]  md:h-[80%] flex-col flex justify-between md:rounded-3xl shadow-xl`}
      >
        {/* App Name  */}
        <h1 className="w-full flex justify-center font-semibold text-2xl mb-2">
          To Do List
        </h1>
        {/* search  */}
        <div className="w-full  flex justify-center mb-4 shadow-md rounded-md ">
          <input
            type="text"
            className="w-10/12  py-2 px-4 border-gray-300  focus:ring-0 border-transparent focus:border-transparent "
            placeholder="Enter Your Task"
            value={inputvalue}
            onChange={(e) => setInputvalue(e.target.value)}
            onKeyDown={(e) => handlepressedkey(e.key)}
          />
          <button className="w-2/12 bg-red-300 rounded-r-md" onClick={addtask}>
            Add
          </button>
        </div>

        {/* conditional rendering of tasks */}
        <div className="flex flex-col justify-start flex-grow py-3 md:px-10 overflow-y-auto  ">
          {filterArray().length > 0 ? (
            filterArray().map((item) => {
              return (
                <div
                  className="flex justify-between w-full py-2 text-lg items-center"
                  key={item.id}
                >
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-red-500 rounded-lg focus:ring-red-500 "
                      checked={item.isCompleted}
                      onChange={() => handlecheckbox(item.id)}
                    />
                    <p
                      className={
                        item.isCompleted === true &&
                        "line-through text-gray-500"
                      }
                    >
                      {item.taskValue}
                    </p>
                  </div>

                  <button className="" onClick={() => deleteTask(item.id)}>
                    <MdDeleteOutline
                      size={30}
                      className="text-red-400 hover:text-black"
                    />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="flex justify-center items-center">
              No Tasks Available
            </p>
          )}
        </div>


        <footer className=" flex-col gap-4 items-center flex">

          <div className="flex  justify-between w-full font-semibold items-center pt-1 ">
            {/* shows the remaing tasks in the list to complete  */}
            <p>Remaining:{remainingTasks()}</p>

            {/* delete all finished tasks  */}
            <button onClick={deleteCompleted}>
              <MdDeleteSweep
                size={30}
                className="text-red-400 hover:text-black"
              />
            </button>
          </div>

          <div className="w-full flex  pt-1 md:pt-0  font-semibold text-center">

            {/* filter tasks on the basis of there status  */}
            <button
              onClick={() => setFilteredList("All")}
              className={`w-1/3 pb-2 ${filteredList === "All" && "active"}`}
            >
              All
            </button>

            <button
              onClick={() => setFilteredList("Finished")}
              className={`w-1/3 pb-2 ${
                filteredList === "Finished" && "active"
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => setFilteredList("Active")}
              className={`w-1/3 pb-2 ${filteredList === "Active" && "active"}`}
            >
              Incompleted
            </button>

          </div>

        </footer>
      </div>
    </div>
  );
};

export default App;
