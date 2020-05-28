import axios from 'axios';
const getHeaders = () => {
    let headers={};
    const token=localStorage.getItem("token");
    if (token)
        headers["Authorization"] = `Bearer ${token}`;
    return { headers: headers };
}
export default {
    get:(endpoint)=>{
        return axios.get(endpoint,getHeaders());
    },
    put:(endpoint,values)=>{
        return axios.put(endpoint,values,getHeaders());
    },
    post:(endpoint,values)=>{
        return axios.post(endpoint,values,getHeaders());
    },
    delete:(endpoint)=>{
        return axios.post(endpoint,getHeaders());
    }
}