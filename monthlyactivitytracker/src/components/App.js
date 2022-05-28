import React, { Component } from "react";
import Header from "./Header";
import months from "../data";
let dte = new Date();
let month = dte.getMonth();
class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      activities: [],
    };
  }
  handleUserInput = (event) => {
    let { value } = event.target;
    let clonedActivites = [...this.state.activities];
    clonedActivites.push({ days: this.generateMonth(), activityname: value });
    if (event.charCode === 13 && value) {
      this.setState({
        userInput: value,
        activities: clonedActivites,
        monthName: months[month],
      });
    }
  };

  componentDidMount() {
    if (localStorage.activities) {
      this.setState(JSON.parse(localStorage.state) || {});
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleActivityClick = ({ target }) => {
    let { id } = target;
    let activityIndex = target.dataset.parent;
    let day = Number(id);
    let targetedDay = { ...this.state.activities[activityIndex].days[day - 1] };
    targetedDay.isDone = !targetedDay.isDone;
    let allactivities = [...this.state.activities];
    allactivities[activityIndex].days[day - 1] = targetedDay;
    this.setState({
      activities: allactivities,
    });
  };

  deleteActivity = ({ target }) => {
    let id = Number(target.id);
    let allactivities = [...this.state.activities];
    allactivities.splice(id, 1);
    this.setState({
      activities: allactivities,
    });
  };
  generateMonth = () => {
    let dt = new Date();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    let daysinmonth = new Date(year, month, 0).getDate();
    let days = [];
    for (let i = 1; i <= daysinmonth; i++) {
      days.push({
        id: i,
        isDone: false,
      });
    }
    return days;
  };

  render() {
    return (
      <>
        <Header handleUserInput={this.handleUserInput} />
        <section>
          <div className="container">
            {this.state.activities.map((eachactivity, i) => {
              return (
                <div className="activity-container">
                  <div className="activityname" key={i}>
                    <p>{eachactivity.activityname}</p>
                    <h3 className="monthName">{this.state.monthName}</h3>
                  </div>
                  <ul>
                    {eachactivity.days.map((day) => {
                      return (
                        <li
                          className={day.isDone === true ? "active" : ""}
                          id={day.id}
                          onClick={this.handleActivityClick}
                          data-parent={i}
                        >
                          {day.id}
                        </li>
                      );
                    })}
                  </ul>
                  {/* button to delete this activity  */}

                  <button
                    className="delete-btn"
                    id={i}
                    onClick={this.deleteActivity}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default App;
