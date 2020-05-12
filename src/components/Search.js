import React,{Component} from 'react';
import SampleContext from '../App';
const people=["A","B","C"];

function Search(props) {
    
    const context=React.useContext(SampleContext);

    const [results,setResults]=React.useState([])
    
    React.useEffect(()=>{
        setResults(people.filter(name=>name===props.search))
    },[]) 
    

    
        return <div>
            <h1>Matching People</h1>
            {context}
            {results.map(name=><div>{name}</div>)}
        </div>
    
}
export default Search;