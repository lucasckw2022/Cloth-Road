class UserSignUpForm extends React.Component{
  constructor(props){
    super(props)
    this.state            = {error: []}
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit(event){
    event.preventDefault();
    this.setState({error:[]})
    var first_name            = this.refs.first_name.value.trim(),
        last_name             = this.refs.last_name.value.trim(),
        email                 = this.refs.email.value.trim(),
        password              = this.refs.password.value.trim(),
        password_confirmation = this.refs.password_confirmation.value.trim();
    $.ajax({
      url: "http://localhost:3000/users",
      method: 'POST',
      data: { first_name:            first_name, 
              last_name:             last_name, 
              email:                 email, 
              password:              password, 
              password_confirmation: password_confirmation},
    }).
    done((data) => {
      HistoryLocation.push("/style")
    }).
    fail((xhr, status, err) => {
      var error_list = [];
      for(err in xhr.responseJSON.errors){
        error_list.push(this.state.error.concat(err +" "+ xhr.responseJSON.errors[err][0]))
      }
      this.setState({error: error_list})
    })
  }
  printError(){
    return this.state.error.map((data) =>{
      return <li>{data}</li>
    })
  }
  render(){
    return(
      <div className="userForm container">
        <h1>User SignUp</h1>
        <ul className="error_message">
        {this.printError()}
        </ul>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">First Name:</label>
            <div className="col-sm-9">
            <input className="form-control" type="text" placeholder="Your name" ref="first_name" />
            </div>
            </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">Last Name:</label>
            <div className="col-sm-9">
            <input className="form-control" type="text" placeholder="Say something..." ref="last_name" />
            </div>
            </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">email:</label>
            <div className="col-sm-9">
            <input className="form-control" type="text" placeholder="Say something..." ref="email" />
            </div>
            </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">Password:</label>
            <div className="col-sm-9">
            <input className="form-control" type="password" placeholder="Say something..." ref="password" />
            </div>
            </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">Confirm Password:</label>
            <div className="col-sm-9">
            <input className="form-control" type="password" placeholder="Say something..." ref="password_confirmation" />
            </div>
            </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-10">
              <input className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
          </div>
        </form>
      </div>
      );
  }
};
