// Include React 
var React = require('react');

var Results = require('./Search_Children/Results');

// Helper Function
var helpers = require('../utils/helpers.js');

// This is the form component. 
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function(){
    return {
      term: "",
      startDate: "",
      endDate: "",
      results: []
    }
  },

  // This function will respond to the user input 
  handleChange: function(event){

    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details: 
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);

  },

  // When a user submits... 
  handleClick: function(){

    console.log("CLICK");
    console.log(this.state.term, this.state.startDate, this.state.endDate);

    if (this.state.term === "" || this.state.startDate === "" || this.state.endDate === "") {
      alert('Please fill out the entire form.');
    } else {
      console.log("UPDATED");

      // Run the query for the address
      helpers.runQuery(this.state.term, this.state.startDate, this.state.endDate)
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

  // Here we render the function
  render: function(){
    console.log("Rendered!");
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">Search for Articles</h3>
          </div>
          <div className="panel-body text-center">

            <form>
              <div className="form-group">
                <h4 className=""><strong>Topic</strong></h4>

                {/*Note how each of the form elements has an id that matches the state. This is not necessary but it is convenient.
                  Also note how each has an onChange event associated with our handleChange event. 
                */}
                <input type="text" className="form-control text-center" id="term" onChange={this.handleChange} required/>
                <br />

                <h4 className=""><strong>Start Date</strong></h4>
                <input type="text" className="form-control text-center" id="startDate" onChange={this.handleChange} required/>
                <br />

                <h4 className=""><strong>End Date</strong></h4>
                <input type="text" className="form-control text-center" id="endDate" onChange={this.handleChange} required/>
                <br />

                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
              </div>

            </form>
          </div>
        </div>

        <div className="col-md-12">
          
          {this.state.results.length !== 0 ? 
          <Results results={this.state.results}>
          </Results> : null}

        </div>
      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Search;