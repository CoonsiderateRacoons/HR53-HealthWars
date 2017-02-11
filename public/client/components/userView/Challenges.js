import React from 'react';
import axios from 'axios';
import NewChallenge from './NewChallenge';
import Challenge from './Challenge'
import { Link } from 'react-router';

export default class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	challenges: [],
    	accepted: []
    };
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.declineChallenge = this.declineChallenge.bind(this);
  }

 componentDidMount () {
  var context = this;
    axios.get('/api/challenges').then(function(res) {
      context.setState({challenges: res.data});
    });
  }

  acceptChallenge(added) {
  	this.state.accepted.push(added)
  	this.state.challenges.splice(this.state.challenges.indexOf(added), 1);
  	this.setState({
  		challenges: this.state.challenges,
  		accepted: this.state.accepted
  	})
  }

  declineChallenge(deleted) {
 		this.state.challenges.splice(this.state.challenges.indexOf(deleted), 1);
  	this.setState({
  		challenges: this.state.challenges,
  	})
  }

	render() {
		return (
			<div>
				<h1>Challenges</h1>
	       <h3> Pending </h3>
				<table className="pending">
	          <tbody>
	          	<tr>
	          		<th>Challenger</th>
	          		<th>Challenged</th>
	          		<th>Exercise</th>
	          		<th className='date'>Date</th>
	          		<th>Location</th>
	          		<th>Accept Challenge?</th>
	          	</tr>
	           	{this.state.challenges.map( (challenge, i) => {
              	return (<Challenge key={i} challenge={challenge} user={challenge.user} invited={challenge.invited} 
              		exercise={challenge.exercise} date={challenge.time} location={challenge.location}
              		acceptChallenge ={this.acceptChallenge} declineChallenge ={this.declineChallenge} /> )
            	})}
	          </tbody>
	        </table>
	        <h3> Upcoming </h3>
	        <table className="upcoming">
	          <tbody>
	          	<tr>
	           		<th>Challenger</th>
	          		<th>Challenged</th>
	          		<th>Exercise</th>
	          		<th>Date</th>
	          		<th>Location</th>
	          		<th></th>
	          	</tr>
	          	{this.state.accepted.map( (challenge, i) => {
              	return (<Challenge key={i} user={challenge.user} invited={challenge.invited} 
              		exercise={challenge.exercise} date={challenge.time} location={challenge.location} /> )
            	})}
	          </tbody>
	        </table>
	        <br/>
				<button className="btn btn-primary admin-button"><Link classname="Link" to="/newChallenge">Create New Challenge</Link></button>
			</div>
		)
	}
}