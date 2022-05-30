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
    const { value } = event.target;
    const clonedActivites = [...this.state.activities];
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

  //before moving to any component update  the data
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  // once data is updated also update  the localStorage
  handleUpdateLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  // once the user click on any day of the month change isDone to true and change background color

  handleActivityClick = ({ target }) => {
    const { id } = target;
    const activityIndex = target.dataset.parent;
    const day = Number(id);
    const targetedDay = { ...this.state.activities[activityIndex].days[day - 1] };
    targetedDay.isDone = !targetedDay.isDone;
    const allactivities = [...this.state.activities];
    allactivities[activityIndex].days[day - 1] = targetedDay;
    this.setState({
      activities: allactivities,
    });
  };

  // delete an activity from  the month
  deleteActivity = ({ target }) => {
    const id = Number(target.id);
    const allactivities = [...this.state.activities];
    allactivities.splice(id, 1);
    this.setState({
      activities: allactivities,
    });
  };

  // to get an array of  the days of a month with isDone default to false
  generateMonth = () => {
    const dt = new Date();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysinmonth = new Date(year, month, 0).getDate();
    const days = [];
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
                <div className="activity-container" key={i}>
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
                          key={eachactivity.activityname + day.id}
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
