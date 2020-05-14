import React from 'react';

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
   const dogs = [
    {
      name: "Harry",
      image: "https://images.dog.ceo/breeds/vizsla/n02100583_10960.jpg",
      praises:0
    },
    {
      name: "Hermione",
      image: "https://images.dog.ceo/breeds/husky/n02110185_1511.jpg",
      praises:0
    }
  ];
  function Count() {
    
    const [state,dispatch]=React.useReducer(reducer,{dogs});
  
  
    return (
      <div className="App">
        <div className="row mt-5">
          {dogs.map(item => (
            <div key={item.name} className="card mx-auto col-4">
              <img className="card-img-top" src={item.image} alt={item.name} />
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <p className="card-text">{item.name} has been praised {item.praises} times!</p>
                <button onClick={()=>dispatch({type:"praise",payload:item.name})} className="btn btn-primary">Praise</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Count;