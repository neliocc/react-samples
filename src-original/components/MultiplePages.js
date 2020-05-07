import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

function AboutPage() {
    return <div>
    This is about us
    <Link to="/home">Back to Home</Link>
</div>;
}

function HomePage() {
    return <div>
    Hello and Welcome!!
    <Link to="/about">About Us</Link>
</div>
}

class MultiplePages extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentPage:"home"
        }
    }

    
    

    render() {
        return <div>
            <h1>Welcome to my page!</h1>
            <Router>
            <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/" component={HomePage} />
           </Switch>
            
            
        </Router>
        </div>
    }
}
export default MultiplePages;