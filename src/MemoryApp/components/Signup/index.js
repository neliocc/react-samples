import React,{Component} from 'react'; 
import {Link} from 'react-router-dom';
import GlobalContext from '../../store';
import Api from '../../api';

class Signup extends Component {

    state={
        username:"",
        password:""
    };

    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    signup=()=>{
        try {
            Api.register(this.state.username,this.state.password,(user)=>{
                this.context.dispatch({
                    type:"signup",
                    payload:user
                })
            })
        } catch(error) {
            alert("There has been an error!");
        }
        
    }

    render() {
        return <div className="card" style={{padding:"20px"}}>
            <h1>Create an Account</h1>
            <div className="form-group">
                <input value={this.state.username} onChange={this.handleInputChange} type="text" className="form-control" name="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
                <input value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" name="password" placeholder="Enter your password" />
            </div>
            <button onClick={this.signup} className="btn btn-primary">Create Account</button>
            <p>Already a member? <Link to="/">Login</Link></p>
        </div>
    }
}
Signup.contextType=GlobalContext;
export default Signup;