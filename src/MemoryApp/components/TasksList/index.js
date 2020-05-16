import React from 'react';
import GlobalContext from '../../store';
import moment from 'moment';
import { Link } from 'react-router-dom';

const TasksList=(props)=>{
    const context=React.useContext(GlobalContext);

    const displayDate=(task)=>{
        if(task.completed) {
            return <div className="badge badge-primary" style={{marginLeft:"20px"}}>Completed on {task.completedOn}</div>;
        } else if(task.dueDate) {
            const isPastDue=moment().diff(moment(task.dueDate,"YYYY-MM-DD"))>0;
            if(isPastDue) {
                return <div className="badge badge-danger" style={{marginLeft:"20px"}}>Past Due!</div>
            } else {
                return <div className="badge badge-warning" style={{marginLeft:"20px"}}>Due on {moment(task.dueDate,"YYYY-MM-DD").format("MM/DD/YYYY")}</div>;
            }

            
        } else {
            return "";
        }
    }

    return <ul style={{listStyle:"none",margin:"0px",marginTop:"20px",padding:"0px"}}>
        {context.globalState.tasksList.filter(task=>{
            if(props.status==="pending"&&!task.completed) {
                return true;
            } else if(props.status==="completed"&&task.completed) { 
                return true;
            } else {
                return false;
            }

            
        }).map(task=><li style={{padding:"5px",marginBottom: '5px',boxShadow:'0px 0px 3px rgba(0,0,0,0.2)'}} key={task.id}>
            <input onChange={()=>{
                context.dispatch({
                    type:"taskCompleted",
                    payload:task.id
                })
            }} checked={task.completed} type="checkbox" style={{marginRight:"20px"}} />
            <Link to={`/task/info/${task.id}`}>{task.title}</Link>

            {displayDate(task)}
            
        </li>)}
    </ul>
}

export default TasksList;