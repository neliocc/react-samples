
import React from 'react';
import axios from 'axios';
const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

class AjaxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            movie:null,
            searching:false
        }
    }

    onFindMovie=()=>{
        this.setState({
            searching:true
        })
        axios.get(`https://www.omdbapi.com/?t=${this.state.title}&apikey=trilogy`).then(response=>{
           
            this.setState({
                movie:response.data,
                searching:false
            })
        })
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    renderMovie=()=>{
        return <div>
            <img src={this.state.movie.Poster} />
            <div>Title: {this.state.movie.Title}</div>
        </div>
    }
    renderSpinner=()=>{
        return <div className="text-center">
            <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
        </div>
    }
    render() {
        return <div>
            <h1>Find great Movies</h1>
            {this.state.searching&&this.renderSpinner()}
            {!this.state.searching&&this.state.movie&&this.renderMovie()}
            <input name="title" value={this.state.title} onChange={this.handleInputChange} />
            <button disabled={!this.state.title} onClick={this.onFindMovie}>Find Movie</button>
        </div>;

        
    }
}
export default AjaxComponent;