import React,{Component} from 'react';
import {MyExampleContext} from '../../App';
class Signup extends Component {
    state={
        name:"",
        email:"",
        password:""
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    render() {
        return <MyExampleContext.Consumer>
            {(value)=><div>
            <h1>{value.name}</h1>
            <input name="name" value={this.state.name} onChange={this.handleInputChange} />
            <input name="email" value={this.state.email} onChange={this.handleInputChange} />
            <input name="password" value={this.state.password} onChange={this.handleInputChange} />
            <button onClick={()=>value.onSignup(this.state)}>Signup</button>
        </div>}
        </MyExampleContext.Consumer>
    }
}

export default Signup;