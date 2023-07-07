

import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from "./home.module.css";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Button, Input
} from '@chakra-ui/react';


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todosCopy , setTodosCopy] = useState([]);
  const [copyForPage, setCopyForPage] = useState([]);
  const [task, setTask] = useState("")
  const { userlogged } = useContext(AuthContext);
  const [editTask, setEdittask] = useState("")
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [nextLength, setNextLength] = useState(0);
  const [searchTask , setSearchTask] = useState("");
  
  useEffect(() => {
    let curId = localStorage.getItem("code_for_tom_todo_user") || null;
    if (!userlogged && curId == null) {
      navigate("/signup");
    }
  }, []);

  async function getAllTodoDetail() {
    let todos = await fetch("http://localhost:8000/todo");
    let response = await todos.json();
    console.log(response);
    
  //   if(response.length>3){
  //     donePaginationFun(response);
  //     return;
  //  }
    let nextLen = Math.ceil(response.length/3);
    setNextLength(nextLen);
    setTodos(response);
    setTodosCopy(response);

  }

  useEffect(() => {
    getAllTodoDetail();
  }, []);

//  const donePaginationFun = (todoArr) => {
//     setCopyForPage(todoArr);
//     let sliced_arr = todoArr.slice(0,3);
//     setTodos(sliced_arr);
//  }

  const postPatchTodo = async () => {
    if (!task) {
      alert("Please enter task first");
      return;
    }

    let todoObj = {
      task: task,
      status: false,
      editable: true
    }

    let todos = await fetch("http://localhost:8000/todo/post", {
      method: "POST",
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await todos.json();
    console.log(response);
    await getAllTodoDetail();
    setTask("");
  }

  const CheckedTodo = async (todo_id) => {

    let todoObj = {
      status: true,
    }

    let todos = await fetch(`http://localhost:8000/todo/update/${todo_id}`, {
      method: "PATCH",
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await todos.json();
    console.log(response);
    await getAllTodoDetail();
  }

  const DeleteTodo = async (todo_id) => {
    let todos = await fetch(`http://localhost:8000/todo/delete/${todo_id}`, {
      method: "DELETE",
    });
    let response = await todos.json();
    console.log(response);
    await getAllTodoDetail();
  }

  const EditTodo = (todo) => {
    setEdittask(todo._id);
    setTask(todo.task);
  }

  const EditTodoTask = async () => {

    let todoObj = {
      task: task,
    }

    let todos = await fetch(`http://localhost:8000/todo/update/${editTask}`, {
      method: "PATCH",
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await todos.json();
    console.log(response);
    await getAllTodoDetail();
    setEdittask("");
    setTask("");
  }

  const SearchFunction = (e) => {
    if(e.target.value===""){
      setTodos(todosCopy);
      setSearchTask(e.target.value);
      return;
    }

    let search = e.target.value;
    setSearchTask(e.target.value);

    let filterTask = todosCopy.filter((todo)=>{
      return todo.task.toLowerCase().includes(search) 
    })

    setTodos(filterTask);

  }

  return (
    <div className={styles.tododiv_maindiv}>
      <div className={styles.tododiv_search}>
        <Input type='text' placeholder='type here to search' value={searchTask} onChange={SearchFunction} />
      </div>
      <div>
        <h1 className={styles.head}>TODO APP</h1>
      </div>
      <div>
        <input className={styles.todo_input} type="text" placeholder='type your task here' value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={() => { editTask ? EditTodoTask() : postPatchTodo() }} className={styles.todo_add_button}>+</button>
      </div>

      <div className={styles.Tododiv_all_todos_main_div}>
        {todos && todos.map((el, i) => {
          return (
            <div key={i} className={styles.tododiv_todo_task}>
              <label>
                <input className={styles.tododiv_input_checkbox} onClick={() => CheckedTodo(el._id)} type={"checkbox"} checked={el.status ? true : false} />
                {el.task}</label>
              <div>
                <i style={{ marginRight: "5px" }} onClick={() => EditTodo(el)} class="uil uil-edit"></i>
                <i style={{ marginRight: "5px" }} onClick={() => DeleteTodo(el._id)} class="uil uil-times"></i>
              </div>
            </div>
          )
        })}

       
          <div className={styles.tododiv_pagination_buttons}>
            <Button isDisabled={page===1 ? true : false} onClick={{}}>Previous</Button>
            <Button >{page}</Button>
            <Button isDisabled={page==nextLength ? true : false} onClick={{}}>Next</Button>
          </div>
       
      </div>
    </div>
  )
}

export default Home;