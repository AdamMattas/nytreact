// Include React 
var React = require('react');

var Action = require('./Action');

var Saved = React.createClass({

  // Here we render the function
  render: function(){

    return(

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

            {this.props.articles.map(function(articles, i) {
              return (
                <Action 
                  key={articles._id}
                  id={articles._id}
                  title={articles.title}
                  lead={articles.lead}
                  url={articles.url}
                  date={articles.date}
                />
              )
            })}

        </div>
      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Saved;