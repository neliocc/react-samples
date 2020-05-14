import React from 'react'; 

const GlobalContext=React.createContext();

export const initialState={
    usersList:[],
    currentAccount:null,
    tasksList:[]
}



export default GlobalContext;