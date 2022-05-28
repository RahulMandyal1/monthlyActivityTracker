import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    let { handleUserInput } = this.props;
    return (
      <>
        <header>
          <h1>Monthly activity tracker!</h1>
          <div className="userinput-container">
            <input
              className="userinput"
              onKeyPress={handleUserInput}
              placeholder="enter a activity"
            />
            <button>Add activity</button>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
