import React,{Component} from 'react';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import ReduxLikeState from './components/ReduxLikeState';
import Count from './components/Dogs';
import GlobalReducer from  './components/GlobalReducer';

const TodoAppContext=React.createContext({todos:[],addTodo:()=>{},markAsDone:()=>{}});

class Home extends Component {
    state={
        todo:""
    };
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleEnter=(e)=>{
        if(e.key==="Enter"&&this.state.todo!=="") {
            this.context.addTodo(this.state.todo);
            this.setState({
                todo:""
            });
            alert("Your task has been added to the list.")
        }
    }

    render() {
        return <div>
            <h1>Add a ToDo</h1>
            <input type="text" onKeyPress={this.handleEnter} name="todo" value={this.state.todo} onChange={this.handleInputChange} placeholder="Enter a task" />
            <div>
                You have <b>{this.context.todos.filter(todo=>todo.completed===false).length}</b> tasks pending. <Link to="/pending">View Tasks here</Link>
            </div>
        </div>
    }
}
Home.contextType=TodoAppContext;


const MyPendingTasks=()=>{
    const globalState=React.useContext(TodoAppContext);
    return <div>
        <h1>Your Pending Tasks</h1>
        <ul style={{listStyle:"none"}}>
            {globalState.todos.filter(todo=>todo.completed===false).map(todo=><li key={todo.id}>
                <input type="checkbox" onChange={()=>globalState.markAsDone(todo.id)} />
                {todo.text}</li>)}
        </ul>
    </div>
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            todos:[]
        }
    }

    saveTodos=()=>{
        localStorage.setItem("todos",JSON.stringify(this.state.todos));
    }
    componentDidMount() {
        const tasks=localStorage.getItem("todos");
        if(tasks) {
            this.setState({
                todos:JSON.parse(tasks)
            })
        }
    }
    componentDidUpdate() {
        this.saveTodos();
    }

    addTodo=(text)=>{
        this.setState({
            todos:[...this.state.todos,{
                id:Date.now(),
                text,
                completed:false
            }]
        })
    }

    markAsDone=(todoId)=>{
        this.setState({
            todos:this.state.todos.map(todo=>{
                if(todo.id===todoId) {
                    todo.completed=true;
                }
                return todo;
            })
        })
    }

    render() {
       
        return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"800px",alignContent:"center",alignItems:"center"}}>
            <GlobalReducer />
            </div>;
    }
}
export default App;