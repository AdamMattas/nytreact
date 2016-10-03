// Include React 
var React = require('react');

// Here we include all of the sub-components
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function(){
    return {
      articles: [] /*Note how we added in this history state variable*/
    }
  },  

  // The moment the page renders get the Articles
  componentDidMount: function(){

    // Get the latest history.
    helpers.getArticles()
      .then(function(response){
        if (response != this.state.articles){
          console.log ("Database", response);

          var dbArr = response.data;
            var newResponse = [];
            for(var i=0; i<dbArr.length; i++){
              newResponse.push(dbArr[i]);
            }

            this.setState({
              articles: newResponse
            })

        }
      }.bind(this))
  },

  // Here we render the function
  render: function(){

    return(

      <div className="container">

        <div className="row">

          <div>
            <img className="header" src="assets/images/nytimes_lrg.png" />
          </div>

          <div className="col-md-12 no-pad">
          
            <Search />

          </div>

          <div className="col-md-12 no-pad">
        
            {this.state.articles.length !== 0 ? 
            <Saved articles={this.state.articles}>
            </Saved> : null}

          </div>

        </div>

      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Main;