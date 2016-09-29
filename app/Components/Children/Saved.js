// Include React 
var React = require('react');

// This is the results component
var Saved = React.createClass({

  // Here we render the function
  render: function(){

    return(

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved</h3>
        </div>
        <div className="panel-body text-center">

            {this.props.articles.map(function(articles, i)
              {
                console.log("GOES HERE", articles.title);
                return <p key={i}>{articles.title} - {articles.title}</p> 
              }
            )}

        </div>
      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Saved;