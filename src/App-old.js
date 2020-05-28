/* eslint-disable no-useless-constructor */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import TodoList from './components/TodoList';
import MultiplePages from './components/MultiplePages';
import {FirstFunction,SecondFunction} from './utils/Functions';





class App extends React.Component {
  render() {
    return <MyContext.Provider value={{text:this.state.value,onValue:this.onValue}}><div className="App">
    <header className="App-header">
      <MultiplePages />
    </header>
  </div></MyContext.Provider>
      
  }
}

function Calculator(props) {
  if (props.operator === "+") {
    return props.num1 + props.num2;
  } else if (props.operator === "-") {
    return props.num1 - props.num2;
  } else {
    return "Unsupported Operation!";
  }

}

function Numbers(props) {
  const numbers = [];
  for (let i = 0; i < props.max; i++) {
    numbers.push(<li>{i}</li>);
  }
  
  return <div>
    <h1>Numbers</h1>
    <ul>{numbers}</ul>
    <h2>Letters</h2>
    <ol>
      {props.letters.map((letter, index) => {
        return <li>{letter}</li>;
      })}
    </ol>
  </div>;
}
function MySampleComponent(props) {

let role="";

if(props.instructor) {
  role="the instructor";
} else  {
  role="a student";
}

return <div style={{
  backgroundColor:"red"
}}>Hello I am {props.name}, I'm {props.age} years old, and I am {(props.instructor&&props.age>30)?"the instructor":"a student"}
<p>{props.children}</p>
</div>;
}

function Button(props) {
  const styling={
    background:props.background,
    color:props.color
  };
  return <button onClick={props.onClick} style={styling}>{props.children}</button>;
}




class MyComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      name:"John Doe"
    }
  }
  
  sayHi=()=>{
    this.setState({name:"And the Magic just happened!"});
  }

  handleInputChange=(e)=>{
    const userInput=e.target.value;
    this.setState({name:userInput});
  }

  render() {
    return <div>I am a Class Component named {this.state.name} 
    <div>
      <input value={this.state.name} onChange={this.handleInputChange} />
    <button onClick={this.sayHi}>Click Me</button>
    </div>
    <Button onClick={()=>alert("Something")} />
    </div>
  }

}
/* 
  Write a Sum Component, it should have two Inputs (Num1 and Num2)
  The component should display:
  Num1 + Num2 = Result where Num1 is the first input, Num2 is the
  second Input, and result is the result of adding the value from
  Num1 and Num 2. If the user changes any of the values, the Result
  must change.
*/
class Sum extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      num1:1,
      num2:2,
      result:3
    }
  }


  handleNum1Change=(e)=> {
    const userInput=e.target.value===""?0:parseInt(e.target.value);
    const result=userInput+this.state.num2;

    this.setState({
      num1:e.target.value===""?e.target.value:userInput,
      result:result
    });


  }
  handleInputChange=(e)=>{
    const userInput=e.target.value===""?0:parseInt(e.target.value);
    let num1=this.state.num1;
    let num2=this.state.num2;
    if(e.target.name==="num1") {
      num1=e.target.value===""?e.target.value:userInput;
    } else {
      num2=e.target.value===""?e.target.value:userInput
    }
    this.setState({
      num1,
      num2,
      result:parseInt(num1)+parseInt(num2)
    })
      
  }

  handleInputChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    return <div>
      <input name="num1" type="number" onChange={this.handleInputChange} value={this.state.num1} />
      +
      <input name="num2" type="number" onChange={this.handleInputChange} value={this.state.num2} />
      =
      {this.state.result}
    </div>
  }
}

function SampleComponent() {
  
  console.log(React.useState("John Doe"))
  const [name,setName]=React.useState("John Doe");

  const onButtonClick=()=>{
    setName("This is the State");
  }

  return <div>
    {name}
    <div>
      <button onClick={onButtonClick}>Click Me</button>
    </div>
  </div>

}

function FunctionSum() {

  const [sumState,setSumState]=React.useState({
    num1:1,
    num2:2,
    result:3
  });

  const handleInputChange=(e)=>{
    const userInput=e.target.value===""?0:parseInt(e.target.value);
    let num1=sumState.num1;
    let num2=sumState.num2;
    if(e.target.name==="num1") {
      num1=e.target.value===""?e.target.value:userInput;
    } else {
      num2=e.target.value===""?e.target.value:userInput
    }
    setSumState({
      num1,
      num2,
      result:parseInt(num1)+parseInt(num2)
    })
      
  }
  
  return <div>
  <input name="num1" type="number" onChange={handleInputChange} value={sumState.num1} />
  +
  <input name="num2" type="number" onChange={handleInputChange} value={sumState.num2} />
  =
  {sumState.result}
</div>
}



export default App;
