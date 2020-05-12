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

export const SampleContext=React.createContext("something");
const people=["A","B","C"];
function Search(props) {
    
    

    const [results,setResults]=React.useState([])
    
    React.useEffect(()=>{
        setResults(people.filter(name=>name===props.search))
    },[]) 
    

    
        return <div>
            <h1>Matching People</h1>
            <SampleContext.Provider>
                {(context)=>{
                    return <div>{context}</div>
                }}
            </SampleContext.Provider>
            
            {results.map(name=><div>{name}</div>)}
        </div>
    
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:"John Doe",
            clicked:false,
            search:"A"
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
        
        return <div className="App">
        <header className="App-header">
            <input type="text" value={this.state.search} onChange={e=>this.setState({search:e.target.value})} />
            <SampleContext.Provider value="This comes from the context">
                <Search search={this.state.search} />
            </SampleContext.Provider>
        </header>
        </div>
    }
}
export default App;