
import React from 'react';
import axios from 'axios';
const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

class AjaxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            movies:[],
            movie:null
        }
    }

    onFindMovie=()=>{
        axios.get(`https://www.omdbapi.com/?s=The Lion King&apikey=trilogy`).then(response=>{
            this.setState({
                movies:response.data.Search
            })
        })
    }

    render() {
        if(this.state.movies.length>0) {
            return this.state.movies.map((movie,index)=><div key={index}>
            <div>{movie.Title}</div>
            <div>Year: {movie.Year}</div>
            <div>Genre: {movie.Genre}</div>
        </div>)
        } else {
            return <div>
            <h1>Find great Movies</h1>
            
            <button onClick={this.onFindMovie}>Find Movies</button>
        </div>;
        }

        
    }
}
export default AjaxComponent;