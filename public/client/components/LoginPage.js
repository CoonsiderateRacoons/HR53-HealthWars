import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';



export default class AddUser extends React.Component {

  constructor(props) {

    super(props);

    this.state = {};

    this.addUser = this.addUser.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }

  handleSignInSubmit(e) {
    e.preventDefault();

    // console.log('inside handleSignInSubmit');
    var user = {
      username: this.refs.usernameSI.value,
      password: this.refs.passwordSI.value
    }
    var context = this;
    axios.post('/api/signin', user).then(function(res) {
      // console.log('inside axios get');
      if (res.data) {
        // console.log('inside res of axios post', res.data);
        // console.log('context', user.username);
        context.props.changeSignedInUser(user.username);
      } else {
        console.log('this shit aint working');
      }
    })

  }

  // Manually add a user to the database
  addUser(e) {
      e.preventDefault();

      var userObj = {
        'name': this.refs.name.value,
        'username': this.refs.username.value,
        'password': this.refs.password.value,
        'team': this.refs.team.value,
        'email': this.refs.email.value,
        'scores': []
      };


      var context = this;

      // below function will apply appropriate amount of 0 scores to a user if added after-the-fact (i.e. added in week 3, scores = [0, 0, 0])
        axios.get('/api/rounds').then(function(res) {
        var roundTotal = res.data.length;
        for (var i = 1; i <= roundTotal; i++) {
          userObj.scores.push(0);
        }

        axios.post('/api/users', userObj)
        .then(function(res) {
          // console.log('User added!');
          alert('User added!');
          context.refs.name.value = '';
          context.refs.username.value = '';
          context.refs.password.value = '';
          context.refs.team.value = '';
          context.refs.email.value = '';
        })
        .catch(function(err) {
          console.log(err);
        });

      });
    }


  render() {
    return (
        <div className="admin-form">
          <form className="form col-sm-offset-3 col-sm-6 sign-in-form">
            <h5>Sign-In</h5>
            <input className="form-control" type="text" name="username" placeholder="Username" ref="usernameSI" />
            <input className="form-control" type="password" name="password" placeholder="Password" ref="passwordSI" />
            <button className="btn btn-primary admin-button" type="submit" value="Add User" onClick={this.handleSignInSubmit}><Link to="/user">Sign-In</Link></button>
          </form><br />
        <form className="form col-sm-offset-3 col-sm-6 new-user-form" onSubmit={this.addUser}>
            <h5>New User? Sign-Up</h5>
            <input className="form-control" type="text" name="name" placeholder="Name" ref="name" />
            <input className="form-control" type="text" name="username" placeholder="Username" ref="username" />
            <input className="form-control" type="text" name="password" placeholder="Password" ref="password" />
            <input className="form-control" type="text" name="team" placeholder="Team" ref="team" />
            <input className="form-control" type="text" name="email" placeholder="Email" ref="email" />
            <button className="btn btn-primary admin-button" type="submit" value="Add User">Add User</button>
          </form><br />
        </div>
    )
  }
}
