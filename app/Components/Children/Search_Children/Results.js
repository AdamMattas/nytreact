// Include React 
var React = require('react');

var Query = require('./Query');

// Helper Function
var helpers = require('../../utils/helpers.js');

// This is the results component
var Results = React.createClass({

  // Here we render the function
  render: function(){

    return(

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body text-center">

            {this.props.results.map(function(results, i) {
              return (
                <Query 
                  key={results._id}
                  title={results.headline.main}
                  lead={results.lead_paragraph}
                  url={results.web_url}
                  date={results.pub_date}
                />
              )
            })}

        </div>
      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Results;