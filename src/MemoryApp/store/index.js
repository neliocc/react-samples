import React from 'react'; 

const GlobalContext=React.createContext();

export const initialState={
    currentAccount:null,
    tasksList:[]
}



export default GlobalContext;