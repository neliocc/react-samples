import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentTask:"",
            tasks:[]
        }
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
    render() {
        return <div>
        <h1>My Todo List</h1>
        <input name="currentTask" onChange={this.handleInputChange} value={this.state.currentTask} type="text" /> <button onClick={this.addTask}>Add Task</button>
        <ul>
            {this.state.tasks.map(task=><li>{task}</li>)}
        </ul>
        </div>;
    }
}

export default TodoList;