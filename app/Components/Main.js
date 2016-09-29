// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function(){
    return {
      searchTerm: "",
      search: "",
      results: [],
      // articles: "",
      articles: [] /*Note how we added in this history state variable*/
    }
  },  

  // This function allows childrens to update the parent.
  setTerm: function(term){
    this.setState({
      searchTerm: term
    })
  },

  // This function allows childrens to update the parent.
  setStart: function(startDate){
    this.setState({
      searchStart: startDate
    })
  },

  // This function allows childrens to update the parent.
  setEnd: function(endDate){
    this.setState({
      searchEnd: endDate
    })
  },

  // If the component changes (i.e. if a search is entered)... 
  componentDidUpdate: function(prevProps, prevState){

    if(prevState.searchTerm != this.state.searchTerm){
      console.log("UPDATED");

      // Run the query for the address
      helpers.runQuery(this.state.searchTerm, this.state.searchStart, this.state.searchEnd)
        .then(function(data){
          if (data != this.state.results)
          {
            console.log("Search" , data);

            var queryArr = data.data.response.docs;
            var newResults = [];
            for(var i=0; i<queryArr.length; i++){
              newResults.push(queryArr[i]);
            }

            this.setState({
              results: newResults
            })

          }
        }.bind(this))
        
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

          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center"><em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em></p>
          </div>

          <div className="col-md-12">
          
            <Form setTerm={this.setTerm} setStart={this.setStart} setEnd={this.setEnd}/>

          </div>

          <div className="col-md-12">
        
            <Results results={this.state.results} />

          </div>

          <div className="col-md-12">
        
            <Saved articles={this.state.articles} />

          </div>

        </div>

        <div className="row">

          

        </div>

      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Main;