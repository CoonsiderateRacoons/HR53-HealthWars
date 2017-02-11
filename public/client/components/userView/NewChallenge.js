import React from 'react';
import axios from 'axios';
import MapView from './MapView';


export default class NewChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      user: {name: 'Savy'}, 
      loc: '',//****hardcoded for now
      query: ''
    };
    this.newChallenge = this.newChallenge.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);

  }


  addData(item) {
    var currentData = this.state.exercises;
    currentData.push(item);
    this.setState({
      exercises: currentData
    });
  }

  componentDidMount() {
    var context = this;

    axios.get('/api/exercises').then(function(res) {
      res.data.forEach(function(exercise) {
        context.addData(exercise.name);
      });
    });
  }
  renderAddress(place) {
    this.setState({loc:place});
  }
  onChangeLocation(event) {
    //console.log("onChangeLocation: ");
      this.setState({query: event.target.value})

  }
  // Manually add a challenge to the database
  newChallenge(e) {
       e.preventDefault();

      var challengeObj =  {
        user: this.state.user.name,
        invited: this.refs.invited.value.split(','),
        exercise: this.refs.custom.value === '' ? this.refs.exercise.value : this.refs.custom.value,
        time: this.refs.time.value,
        location: this.refs.location.value
      }

      console.log(challengeObj)

      var context = this;

      axios.post('/api/challenges', challengeObj)
      .then(function(res) {
        alert('Challenge added!');
        context.refs.invited.value = '';
        context.refs.custom.value = '';
        context.refs.exercise.value = '';
        context.refs.time.value = '';
        context.refs.location.value = '';
      })
      .catch(function(err) {
        console.log(err);
      });

      //send email

    }


  render() {
    return (
      <div>
     
        <div className='challenge-form' id="newChallenge">
      <script src='http://maps.googleapis.com/maps/api/js?key=AIzaSyAI83WruY4-IgmbI3VdO29t64MfgUfO_ao&libraries=places&callback=initMap' />

          <form className="form" onSubmit={this.newChallenge}>
            <h3>New Challenge</h3>
            <input className="form-control" type="text" name="invited" placeholder="Jane Doe, Joe Shmo" required="true" ref="invited" />
            <select className="exercise-dropdown" name="exercise" form='newChallenge' required="true" ref="exercise" >
            <option value="Some Exercise">--Select Exercise--</option>
              { this.state.exercises.map((exercise, i) =>
              <option key={i} value={exercise.toString()}>{exercise}</option>) }
            </select>  OR  <input type="text" name="custom" placeholder="Custom" ref="custom" /><br/><br/>
            <input className="form-control" type="datetime-local" max="2999-12-31" min="2017-02-08" name="time" ref="time" />
            <input className="form-control" type="text" name="location" placeholder="location" ref="location" value={this.state.query} onChange={this.onChangeLocation}/>
            <input className="form-control" placeholder="Address for Challenege" required="true" value={this.state.loc} />
            <button className="btn btn-primary admin-button" type="submit" value="Add User">Create Challenge</button>

          </form><br />
        </div>
           <MapView str={this.state.query} renderAddress={this.renderAddress}/>
          
        </div>
    )
  }
}