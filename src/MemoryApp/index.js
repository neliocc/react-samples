import React from 'react';
import GlobalContext,{initialState} from './store';
import Authorization  from './containers/Authorization';
import Home from './containers/Home';
import moment from 'moment';
import Api from './api';


const persistApp=(state)=>{
    localStorage.setItem("state",state.currentAccount.id)
}
const reducer=(state,action)=>{
    if(action.type==="tasksLoaded") {
        const newState={
            ...state,
            tasksList:action.payload.tasks,
            tasksLoaded:true
        };
        return newState;
    } else if(action.type==="signup") {
        const newState={
            ...state,
            currentAccount:{
                id:action.payload._id,
                username:action.payload.username
            }
        }; 
        persistApp(newState);
        return newState;
    } else if(action.type==="login") {
        const newState={
            ...state,
            currentAccount:{
                id:action.payload._id,
                username:action.payload.username
            }
        }; 
        localStorage.setItem("token",action.payload.token)
        persistApp(newState);
        return newState;
    } else if(action.type==="newTask") {
        const newState={
            ...state,
            tasksList:[...state.tasksList,action.payload]
        }; 
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
        return newState;
    }
    return state;
}



const MemoryApp=()=>{

    const [globalState,dispatch]=React.useReducer(reducer,initialState);

    React.useEffect(()=>{
        if(localStorage.getItem("token")&&!globalState.currentAccount) {
            Api.authenticate((user)=>{
                if(user) {
                    dispatch({type:"login",payload:user});
                } else {
                    localStorage.clear();
                }
            })
        }
        if(globalState.currentAccount&&!globalState.tasksLoaded) {
            Api.loadTasks(globalState.currentAccount.id,(tasks)=>{
                dispatch({
                    type:"tasksLoaded",
                    payload:{
                        tasks:tasks||[]
                    }
                })
            })
        }
    })

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