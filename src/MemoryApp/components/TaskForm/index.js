import React,{Component} from 'react';
import CKEditor from 'ckeditor4-react';
import GlobalContext from '../../store';
import {withRouter} from 'react-router-dom';


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            notes:"<b>This is bold</b> and this isn't",
            dueDate:""
        }
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    save=()=>{
        if(!this.state.title) {
            alert("Please enter the name of the task")
        } else {
            this.context.dispatch(
                {
                    type:"newTask",
                    payload:{
                        title:this.state.title,
                        notes:this.state.notes,
                        dueDate:this.state.dueDate,
                        completed:false,
                        username:this.context.globalState.currentAccount,
                        id:Date.now()
                    }
                }
            );
            alert("The task has been saved!");
            this.props.history.push("/");
                
        }
    }
    onEditorChange=(evt)=>{
        this.setState({
            notes:evt.editor.getData()
        })
        
    }
    render() {

        return <div>
            <h2>Create a Task</h2>
            <div className="form-group">
                <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Enter Task Name" />
            </div>
            <div className="form-group">
                <label>Due date (optional)</label>
                <input className="form-control" type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleInputChange}  />
            </div>
            <div className="form-group">
            <CKEditor
            onChange={this.onEditorChange}
            data={this.state.notes}
        />
        <div style={{textAlign:"center",marginTop:"30px"}}>
        <button onClick={this.save} className="btn btn-primary">Save Task</button>
        </div>
            </div>
        </div>
    }
}
TaskForm.contextType=GlobalContext;
export default withRouter(TaskForm);

//Example of HOC
const myFunction=(WrappedComponent)=>{
    return (props)=><WrappedComponent name="Something" />
}