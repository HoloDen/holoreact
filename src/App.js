import React, { Component } from 'react';
import './App.css';

let list = [];

class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);

    this.state = {input: '', data: '',}
  }

  componentDidMount(){
      fetch('/fn/dogManagement/listDogs', {
          method: 'post'
      }).then(r => r.json()).then(dogs => {
          console.log(dogs)
          const list = dogs.map(d => `<pre>${d.ascii}</pre>`)
          document.querySelector('#list').innerHTML = list.join('\n')
      })
  }

  handleChangeInput(e){
      this.setState({input: e.target.value});
  }

  handleSubmit(){
    // e.preventDefault();
      const ascii = this.state.input;
      fetch('/fn/dogManagement/dogPicCreate', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              ascii,
              name: "Bobby",
              breed: "Huscii"
          })
      });
  }

  render() {

    return (
      <div>
          <div>
            <h1>React Doggy Shelter</h1>
          </div>
          <div id="list" class="inputArea">

          </div>
          <form class="inputArea">
            <textarea onChange={this.handleChangeInput}>

            </textarea>
              <button type="submit" id="readEntry" onClick={this.handleSubmit}>Submit</button>
          </form>
      </div>
    );
  }
}

export default App;

// fetch('/fn/blah/blah')