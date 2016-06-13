class UserSignInForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {error: ""}
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit(event){
    event.preventDefault();
    this.setState({error: ""});
    var email = this.refs.email.value.trim(),
        password = this.refs.password.value.trim();
    if(email == "" || password == ""){
      this.setState({error: "Missing address or password"});
    } else{
      $.ajax({
        url: 'http://localhost:3000/sessions',
        method: 'POST',
        data: {email: email, password: password},
      }).
      done((data)=>{
        if(data.errors){
          this.setState({error: data.errors[0]})
        } else{
          this.props.close();
          this.props.signIn(data);
          this.props.showSuccessMessage("Sign up successfully!");
        }
      })
    }
  }
  printError(){
    if(this.state.error != ""){
      return <li>{this.state.error}</li>
    }
  }
  render(){
    return(
      <div className="sign-in-form container">
        <h1>Sign In</h1>
        <ul className="error_message">
          {this.printError()}
        </ul>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-3" for="email">Email:</label>
            <div className="col-sm-9">
              <input className="form-control" type="email" ref="email" placeholder="Enter email" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="password">Password:</label>
            <div className="col-sm-9">
              <input className="form-control" type="password" ref="password" placeholder="Enter password" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-10">
              <input className="btn btn-info" type="submit" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
