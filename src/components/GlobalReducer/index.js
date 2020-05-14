import React from 'react';
import GlobalContext,{dogs} from './store';
import FirstDog from './FirstDog';

const reducer=(state,action)=>{
    if(action.type==="praise") {
      return {
        ...state,
        dogs:state.dogs.map(dog=>{
          if(dog.name===action.payload) {
            dog.praises++;
          }
          return dog;
        })
      }
    } else {
      return state;
    }
}

const GlobalReducer=()=>{
    
    const [globalState,dispatch]=React.useReducer(reducer,{dogs});

    return <GlobalContext.Provider value={{globalState,dispatch}}>
        <div>Hello World!</div>
        <FirstDog />
    </GlobalContext.Provider>
}
export default GlobalReducer;