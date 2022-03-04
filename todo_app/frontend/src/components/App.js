import logo from '../logo.svg';
import '../App.css';
import React, { useState,useEffect  } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axiosInstance from '../axios';

function App() {
  const [todoList, setTodoList] = useState([]);
  const user = localStorage.getItem('user');
  var uncompletedTasks = todoList.filter(item => item.completed == false).length
  const [activeItem, setActiveItem] = React.useState({
    id: null, title: '',completed:false
  });
  const [editing, setEditing] = useState(false);
  

  useEffect(() => {
    fetchTasks()
  }, []);

  function fetchTasks (){
    axiosInstance.get(`/task-list/`)
    .then(response => response.data)
    .then(data => 
      setTodoList(data.reverse()))
  }

  function handleChange(e){
    var name = e.target.name
    var value = e.target.value
    
    setActiveItem({
        ...activeItem,
        title:value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    var url = `task-create/`

    if(editing == true){
      url = `task-update/${activeItem.id}/`
      setEditing(false)
    }

    axiosInstance.post(url,activeItem)
      .then((response) => {
      fetchTasks()
      setActiveItem({ 
       id: null, title: '',completed:false
      })
      }).catch(function(error){
      console.log('ERROR:',error)
      })

  }

  function startEdit(task){
    setActiveItem(task)
    setEditing(true)
  }

  function deleteItem(task){
    axiosInstance.delete(`/task-delete/${task.id}/`)
    .then(() => {fetchTasks()})
  }

  function strikeUnstrike(task){
    task.completed = !task.completed

    axiosInstance.post(`task-update/${task.id}/`, {'completed':task.completed, 'title':task.title})
    .then(() => {fetchTasks()})
  }

  if (localStorage.getItem("access_token") === null) { 
    return (
      <Navigate to='/login' />
    )
  }
  return (
    <>
    <nav className="navbar navbar-light bg-white">
      <a className="navbar-brand">Hi, {user} you have {uncompletedTasks} pending tasks.</a>
      <NavLink to={'logout/'}>
        <button className="btn btn-outline-danger my-2 my-sm-0" href="#" type="button">Logout</button>
      </NavLink>
    </nav> 
    <div className="container">
      <div id="task-container">
        <div id="form-wrapper">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div style={{flex:6}}>
                <input onChange={handleChange} value={activeItem.title} className="form-control" id="title" type="text" name="title" placeholder="Add task"/>
              </div>
                
              <div style={{flex:1}}>
                <input id="submit" className="btn btn-warning" type="submit" name="Add"/>
              </div>
            </div>
          </form>
        </div>
        <div id="list-wrapper">
          {todoList.map(function(task,index){
            return(
              <div key={index} className="task-wrapper flex-wrapper">
                <div onClick={() => strikeUnstrike(task)} style={{flex:7}}>
                  {task.completed == false ? (
                    <span>{task.title}</span>
                  ) : (
                    <strike>{task.title}</strike>
                  )}  
                </div>
                <div style={{flex:1}}>  
                  <button onClick={() => startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                </div>
                <div style={{flex:1}}>  
                  <button onClick={() => deleteItem(task)} className="btn btn-sm btn-outline-dark delete">X</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
     
    </div>
    </>
  );
}


export default App;
