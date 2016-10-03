// Include React 
var React = require('react');

// Here we include all of the sub-components
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

  // Here we set an empty array that will later hold retrieved articles from the DB
  getInitialState: function(){
    return {
      articles: []
    }
  },  

  // The moment the page renders get the Articles from the DB
  componentDidMount: function(){

    // Get the latest saved articles using the helper.
    helpers.getArticles()
      .then(function(response){
        //checks if there are articles sent back
        if (response != this.state.articles){
          console.log ("Database", response);

          var dbArr = response.data; //set response to a variable
            var newResponse = []; //create empty array to push to
            //loop through response and push each article to the array
            for(var i=0; i<dbArr.length; i++){
              newResponse.push(dbArr[i]);
            }

            //update the article state with the retrieved articles
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