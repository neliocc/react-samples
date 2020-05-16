import React from 'react';
import GlobalContext,{initialState} from './store';
import Authorization  from './containers/Authorization';
import Home from './containers/Home';
import moment from 'moment';

const persistApp=(state)=>{
    localStorage.setItem("state",JSON.stringify(state))
}
const reducer=(state,action)=>{
    if(action.type==="signup") {
        const newState={
            ...state,
            usersList:[...state.usersList,action.payload],
            currentAccount:action.payload.username
        }; 
        persistApp(newState);
        return newState;
    } else if(action.type==="login") {
        const newState={
            ...state,
            currentAccount:action.payload.username
        }; 
        persistApp(newState);
        return newState;
    } else if(action.type==="newTask") {
        const newState={
            ...state,
            tasksList:[...state.tasksList,action.payload]
        }; 
        persistApp(newState);
        return newState;
    } else if(action.type==="taskCompleted") {
        const newState={
            ...state,
            tasksList:state.tasksList.map(task=>{
                if(task.id===action.payload) {
                    task.completed=true;
                    task.completedOn=moment().format("MM/DD/YYYY");
                }
                return task;
            })
        }; 
        persistApp(newState);
        return newState;
    }
    return state;
}



const MemoryApp=()=>{

    const savedState=localStorage.getItem("state");

    const [globalState,dispatch]=React.useReducer(reducer,savedState?JSON.parse(savedState):initialState);

    const displaySection=()=>{
        if(!globalState.currentAccount) {
            return <Authorization />
        } else {
            return <Home />
        }
    }


    return <GlobalContext.Provider value={{globalState,dispatch}}>
        <div className="row" style={{paddingTop:"50px"}}>
            <div className="col-6 offset-3">
                {displaySection()}
            </div>

        </div>
    </GlobalContext.Provider>
}

export default MemoryApp;