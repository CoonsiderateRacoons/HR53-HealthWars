import React from 'react';
import dateFormat from 'dateformat';
import AddToCalendar from './AddToCalendar'

export default class Challenge extends React.Component {

  render() {

    return (
      <tr className='Challenge'>
        <td className='user'>{this.props.user}</td>
        <td className='invited'>{this.props.invited.join(', ')}</td>
        <td className='exercise'>{this.props.exercise}</td>
        <td className='date'>{dateFormat(this.props.date, "ddd, mmm d h:MM TT")}</td>
        <td className='location'>{this.props.location}</td>
        {this.props.acceptChallenge ? <td className='accept'>
        <button className="btn btn-primary admin-button" onClick={this.props.acceptChallenge.bind(null, this.props.challenge)}>Accept</button> 
        <button className="btn btn-primary admin-button" onClick={this.props.declineChallenge.bind(null, this.props.challenge)}>Decline</button>
        </td> : <td><AddToCalendar exercise={this.props.exercise} user={this.props.user} location={this.props.location} date={this.props.date}/></td> }
      </tr>
    )
  }
}