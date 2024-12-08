// function component
function App_func(props) {
  const colorStyle = {
    color: props.color,
    fontSize: props.size + "px",
  };

  return (
    <div>
      <div style={colorStyle}>Hello World!</div>
    </div>
  );
}

// class component
import React from "react";

class App_class_1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + "px",
    };

    return (
      <div>
        <div style={colorStyle}>Hello World!</div>
      </div>
    );
  }
}

// import React from "react";
class App_class_2 extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { counter: 0 };

  incrementCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + "px",
    };

    return (
      <div style={colorStyle}>
        React Component
        <br />
        <br />
        <button onClick={this.incrementCounter}>Click Me!</button>
        <br />
        <br />
        {this.state.counter}
      </div>
    );
  }
}

// class component with api requests

// import React from "react";
import axios from "axios";

class App extends React.Component {
  state = { APIlist: [] };

  componentDidMount() {
    let url = "https://api.publicapis.org/entries?category=Animals";
    axios({
      method: "get",
      url: url,
      responseType: "json",
    })
      .then((resp) => {
        let listOfEntries = resp.data.entries;
        let listOfEntriesAsArray = Object.entries(listOfEntries);

        let entryDetails = listOfEntriesAsArray.map((entryDetail) => {
          /*
          return (
            <li style={{ color: "green" }}>
              {entryDetail[1]["API"]} ------- {entryDetail[1]["Link"]}{" "}
            </li>
          );
          */

          return (
            <tr>
              <td style={{ color: "red", border: "1px solid black" }}>
                {" "} {entryDetail[1]["API"]} {" "}
              </td>
              <td style={{ color: "red", border: "1px solid black" }}>
                {" "} {entryDetail[1]["Link"]} {" "}
              </td>
            </tr>
          );
        });

        // this.setState({ APIlist: <ul>{entryDetails}</ul> });
        this.setState({
          APIlist: (
            <table style={{ border: "1px solid black", margin: "30px" }}>
              <tbody>{entryDetails}</tbody>
            </table>
          ),
        });
      })

      .catch((err) => {
        console.log(err.toString());
      });
  }

  render() {
    const colorStyle = {
      color: this.props.color,
      fontSize: this.props.size + "px",
    };

    return (
      <div style={colorStyle}>
        <h2>APIs List</h2>
        <br />
        <div>{this.state.APIlist}</div>
      </div>
    );
  }
}

export default App;
