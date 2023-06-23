import React, { useState,useEffect } from "react";

const App = () => {



  const [tasks, setTasks] = useState(() => {
    const savedTodos = localStorage.getItem("to_do_list-tasks");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });


  const [inputvalue, setInputvalue] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [filteredList, setFilteredList] = useState("All");

  
useEffect(() => {
 localStorage.setItem("to_do_list-tasks",JSON.stringify(tasks))
}, [tasks,isChecked])





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
    } else {
      setTasks([
        { taskValue: inputvalue.charAt(0).toUpperCase() + inputvalue.slice(1), isCompleted: false, id: Date.now() },
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

    <div className="">


      <div className="">
        <input
          type="text"
          className=""
          placeholder="Enter The Task"
          value={inputvalue}
          
          onChange={(e) => setInputvalue(e.target.value)}
          onKeyDown={(e) => handlepressedkey(e.key)}
        />
        <button className="" onClick={addtask}>
          Add
        </button>
      </div>



      {/* conditional rendering  */}

      {filterArray().length > 0 ? (
        filterArray().map((item) => {
          return (
            <div className="" key={item.id}>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handlecheckbox(item.id)}
              />
              <p>{item.taskValue}</p>
              <button
                className=""
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <p>No Tasks Available</p>
      )}



      <footer className="">


        {/* shows the remaing tasks in the list to complete  */}
        <p>{remainingTasks()} is remaining</p>


        {/* filter tasks on the basis of there status  */}
        <button
          onClick={() => setFilteredList("All")}
          className={`${filteredList === "All" && ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilteredList("Finished")}
          className={`${filteredList === "Finished" && ""}`}
        >
          Finished
        </button>
        <button
          onClick={() => setFilteredList("Active")}
          className={`${filteredList === "Active" && ""}`}
        >
          Active
        </button>


        {/* delete all finished tasks  */}
        <button onClick={deleteCompleted}> Remove Finished Tasks</button>


      </footer>



    </div>
  );
};

export default App;
