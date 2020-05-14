import React from 'react';
import GlobalContext from './store';

const FirstDog=()=>{
    const context=React.useContext(GlobalContext);
    const dog=context.globalState.dogs[0];
    return  <div key={dog.name} className="card mx-auto col-4">
    <img className="card-img-top" src={dog.image} alt={dog.name} />
    <div className="card-body">
      <h4 className="card-title">{dog.name}</h4>
      <p className="card-text">{dog.name} has been praised {dog.praises} times!</p>
      <button onClick={()=>context.dispatch({type:"praise",payload:dog.name})} className="btn btn-primary">Praise</button>
    </div>
  </div>
}

export default FirstDog;