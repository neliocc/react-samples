import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Counter from './components/Counter';

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  renderFriends= ()=>{
    return this.state.friends.map(friend => (
      <FriendCard
        removeFriend={this.removeFriend}
        id={friend.id}
        key={friend.id}
        name={friend.name}
        image={friend.image}
        occupation={friend.occupation}
        location={friend.location}
      />
    ));
  }
  renderCounter=()=>{
    return <Counter />;
  }

  renderButtons=()=>{
    return <div><button>Show Friends</button>
    <button>Show Counter</button></div>
  }
  render() {
    if(this.state.view==="friends") {
      return this.renderFriends();
    } else if(this.state.view==="counter") {
      return this.renderCounter();
    } else {
      return (
        <Wrapper>
          <Title>Friends List</Title>
          {this.renderButtons()}
          
        </Wrapper>
      );
    }
    
  }
}

export default App;
