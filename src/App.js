import React from 'react';
import './App.css';
import './styles.css';
import Signup from './components/Signup'

import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'



export const MyExampleContext=React.createContext();

function MyFunctionalComponent(props) {
    const [name,setName]=React.useState("John Doe")
    
    const changeName=()=>{
        setName("Someone Else");
    }

    return <div>I am Functional! {name} <button onClick={changeName}>Click Me</button></div>;
}

class Page1 extends React.Component {
    
    render() {
        if(!this.context.account) {
        return <div>Please sign up first. {this.context.buttonClicked?"good! But sign up.":"Hey, click the button!"}</div>;
        } else {
            return <div>Hi, I am page one! And, {this.context.account.name} </div>;
        }
    }
}
Page1.contextType=MyExampleContext;



function Page2() {
   const value=React.useContext(MyExampleContext);
   if(!value.account) {
        return <div>Please sign up first.</div>;
    } else {
        return <div>Hi, I am page two! And, {value.account.name} </div>;
    }
}
class MyButton extends React.Component {
    
    

    render() {
        if(this.context.buttonClicked) {
            return "I have been clicked!";
        } else {
            return <button onClick={this.context.onButtonClicked}>Click ME!</button>
        }
    }
}
MyButton.contextType=MyExampleContext;

class HomePage extends React.Component {
    render() {
        return <div>
            <h1>Home!</h1>
            <Signup />
        </div>
    }
}

class Logout extends React.Component {

    render() {
        return <MyExampleContext.Consumer>
            {(value)=>{
                return <button onClick={()=>value.onSignup(null)}>Logout!</button>
            }}
        </MyExampleContext.Consumer>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:"John Doe",
            clicked:false
        }
    }
    componentDidMount() {
        console.log("I have loaded!!!")
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {
        
    }
    changeName=()=>{
        this.setState({
            account:null
        })
    }
    onSignup=(account)=>{
        this.setState({account});
    }
    clickButton=()=>{
        this.setState({clicked:true})
    }
    render() { 
        const globalState={
            account:this.state.account,
            onSignup:this.onSignup,
            buttonClicked:this.state.clicked,
            onButtonClicked:this.clickButton

        };
        return <div className="App">
        <header className="App-header">
        
        <MyExampleContext.Provider value={globalState}>
        <MyButton />
            {this.state.account?<Logout />:<Signup />}
          <Router>
              
              <Switch>
                  <Route path="/page1" component={Page1} />
                  <Route path="/page2" component={Page2} />
                 
              </Switch>

              <div>
              <Link to="/page1">Page 1</Link>
              <Link to="/page2">Page 2</Link>
          </div>
          </Router>
        </MyExampleContext.Provider>  
        </header>
        </div>
    }
}
export default App;