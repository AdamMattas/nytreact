// Include React 
var React = require('react');

// Helper Function
var helpers = require('../utils/helpers.js');

// This component displays the articles that have been saved
// and handles the removal
var Action = React.createClass({

  // This function will respond to the user click
  handleClick: function(){
    // Send article data to server to delete from db
    helpers.deleteArticles(this.props.id)
    .then(function(res){
      console.log(res.status);
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
                  <button className="btn btn-danger" onClick={this.handleClick}>Remove</button>
                  <a className="btn btn-default" href={this.props.url} target="_blank">
                    View Article
                  </a>
                </div>
              <p>Date Published: {this.props.date}</p>
            </li>

        </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Action;