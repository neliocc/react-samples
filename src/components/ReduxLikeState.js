import React from 'react';

const initialState={
    count:0,
    time:0,
    name:""
};

const reducer=(state,action)=>{
    if(action.type==="increase") {
        return {
            ...state,
            count:state.count+1
        };
    } else if(action.type==="decrease") {
        return {
            ...state,
            count:state.count-1
        };
    } else if(action.type==="gettime") {
        return {
            ...state,
            time:Date.now()
        };
    } else if(action.type==="setname") {
        return {
            ...state,
            name:action.payload
        };
    }
    else {
        return state;
    }
}


const ReduxLikeState=()=>{
    const [state,dispatch]=React.useReducer(reducer,initialState);

    return <div>
        <h1>Hi I am using a reducer, start counting</h1>
        <h4>{state.count}</h4>
        <h4>The time is: {state.time}</h4>
        <button onClick={()=>dispatch({type:"increase"})}>Increase</button>
        <button onClick={()=>dispatch({type:"decrease"})}>Decrease</button>

        <button onClick={()=>dispatch({type:"gettime"})}>Add Time</button>
        <h1>Hi {state.name}</h1>
        <input value={state.name} onChange={(e)=>dispatch({type:"setname",payload:e.target.value})} />
    </div>
}

export default ReduxLikeState;