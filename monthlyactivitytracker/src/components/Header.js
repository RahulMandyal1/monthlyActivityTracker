
function Header(props){
  return (
    <>
      <header>
        <h1>Monthly activity tracker!</h1>
        <div className="userinput-container">
          <input
            className="userinput"
            onKeyPress={props.handleUserInput}
            placeholder="enter a activity"
          />
          <button>Add activity</button>
        </div>
      </header>
    </>
  );
}
export default Header;
