import React from 'react';

function TodoItem(props) {
    return <li>{props.children}</li>;
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentTask:"",
            tasks:[]
        }
    }
    render() {
        return <div>
        <h1>My Todo List</h1>
        <input name="currentTask" onChange={this.handleInputChange} value={this.state.currentTask} type="text" /> <button onClick={this.addTask}>Add Task</button>
        <ul>
            {this.state.tasks.map((task,index)=><TodoItem key={`task-${index}`}>{task}</TodoItem>)}
        </ul>
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