import React,{Component} from 'react'; 
import {Link} from 'react-router-dom';
import GlobalContext from '../../store';
import Api from '../../api';

class Login extends Component {

    state={
        username:"",
        password:""
    };

    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    login=()=>{
        if(!this.state.username||!this.state.password) {
            alert("Please enter your username and password");
        } else {
            Api.login(this.state.username,this.state.password,(user)=>{
                if(user) {
                    this.context.dispatch({type:"login",payload:user})
                } else {
                    alert("Invalid credentials!!")
                }
                
            })
        }
        

    }
    render() {
        return <div className="card" style={{padding:"20px"}}>
            <h1>Log in to your account</h1>
            <div className="form-group">
                <input value={this.state.username} onChange={this.handleInputChange} type="text" className="form-control" name="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
                <input value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" name="password" placeholder="Enter your password" />
            </div>
            <button onClick={this.login} className="btn btn-primary">Login</button>
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
        </div>
    }
}
Login.contextType=GlobalContext;
export default Login;