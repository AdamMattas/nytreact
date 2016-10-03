// Include React 
var React = require('react');

// Helper Function
var helpers = require('../../utils/helpers.js');

// This is the results component
var Query = React.createClass({

  // This function will respond to the user click
  handleClick: function(){
    // Send article data to server to save to db
    helpers.postArticles({
      title: this.props.title,
      lead: this.props.lead,
      date: this.props.date,
      url: this.props.url
    }).then(function(res){
      console.log(res.status);
      // Show message
    }.bind(this));
  },

  // Here we render the function
  render: function(){

    return(

      <div className="panel-body text-center">

        <li className="list-group-item">
          <h3>{this.props.title}</h3>
          <p>{this.props.lead}</p>
          <div className="btn-group pull-right">
            <button className="btn btn-primary" onClick={this.handleClick}>Save</button>
            <a className="btn btn-default" href={this.props.url} target="_blank">View Article</a>
          </div>
          <p>Date Published: {this.props.date}</p>
        </li>

      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Query;