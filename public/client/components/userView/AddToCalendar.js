import React from 'react';

export default class AddToCalendar extends React.Component {
	constructor(props){
		super(props)

		this.buildURL = this.buildURL.bind(this)
	}

	buildURL() {
		var beginning = "https://www.google.com/calendar/render?action=TEMPLATE";
		var text = "&text=" + this.props.exercise.split(' ').join('+') + "+Challenge";
		var dates = "&dates=" + this.props.date.toString().replace(/-|:|\.\d\d\d/g,"")+"/"+this.props.date.toString().replace(/-|:|\.\d\d\d/g,"")
		var details = "&details="+ this.props.user + "+has+challenged+you+to+a+" + this.props.exercise + "+Challenge";
		var location = "&location=" + this.props.location.split(' ').join('+');
		var end = "&sf=true&output=xmll#eventpage_6"

		var URL = beginning+text+dates+details+location+end;
		console.log(URL) 
		return(URL)
	}

  render() {

    return (
    	<button className="btn btn-primary admin-button"> 
	    	<a href={this.buildURL()} target="_blank">Add to my calendar</a>
			</button>
    )
  }
}

  	


			// 	<a href=`http://www.google.com/calendar/event?
			// action=TEMPLATE
			// &text="${this.props.exercise + " Challenge!"}"
			// &dates="{this.props.date}"
			// &details= "{this.props.user} + " has challenged you to a" + {this.props.exercise} + " Challenge!!""
			// &location="{this.props.location}"
			// &trp=false
			// &sprop=
			// &sprop=name:"
			// target="_blank" rel="nofollow"`>Add to my calendar</a>