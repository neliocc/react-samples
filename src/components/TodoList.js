import React from 'react';

function TodoItem(props) {
    return <li>{props.children} <button onClick={props.onDelete}>Delete</button></li>;
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentTask:"",
            name:"",
            tasks:[]
        }
    }


    componentDidMount() {
        const tasks=JSON.parse(localStorage.getItem("tasks"));
        if(tasks) {
            this.setState({tasks});
        }
    }

    componentDidUpdate(oldProps) {

    }

    componentWillUnmount() {
       
    }

    deleteTask=(index)=>{
        this.setState({
            tasks:this.state.tasks.filter((task,i)=>i!==index)
        })
    }

    saveTasks=()=>{
        localStorage.setItem("tasks",JSON.stringify(this.state.tasks));
        alert("Tasks saved successfully!!!");
    }


    render() {
        return <div>
        <h1>My Todo List</h1>
        <input name="currentTask" onChange={this.handleInputChange} value={this.state.currentTask} type="text" /> <button onClick={this.addTask}>Add Task</button>
        <input name="name" onChange={this.handleInputChange} value={this.state.name} type="text" /> 
        <ul>
            {this.state.tasks.map((task,index)=><TodoItem onDelete={()=>this.deleteTask(index)} key={`task-${index}`}>{task}</TodoItem>)}
        </ul>
        <button onClick={this.saveTasks}>Save Tasks</button>
        </div>;
    }
    handleInputChange=(e)=>{
        this.setState({
          [e.target.name]:e.target.value
        })
      }

    addTask=()=>{
    
        this.setState({
            tasks:[...this.state.tasks,this.state.currentTask],
            currentTask:""
        })
    }
    
}

export default TodoList;