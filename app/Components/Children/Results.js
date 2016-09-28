// Include React 
var React = require('react');

// This is the results component
var Results = React.createClass({

  // Here we render the function
  render: function(){

    return(

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

            {console.log(this.props.results)}
            {this.props.results.map(function(results, i)
              {
                console.log("GOES HERE", results);
                return <p key={i}>{results.headline.main} - {results.headline.main}</p> 
              }
            )}

        </div>
      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Results;