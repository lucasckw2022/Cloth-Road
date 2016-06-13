class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {showSignInModal: false,
                  showOverlay:  false,
                  overlayBody: "",
                  signin: false,
                  userInfo: [],
                  toggleConfirmMessage: false,
                  confirmMessage: "",
                  showPostModal: false}
    this.toggleSignInModal = this.toggleSignInModal.bind(this)
    this.handleOverlay = this.handleOverlay.bind(this)
    this.signin = this.signin.bind(this)
    this.signOut = this.signOut.bind(this)
    this.toggleConfirmMessage = this.toggleConfirmMessage.bind(this)
    this.togglePostModal = this.togglePostModal.bind(this)
    this.passUserInfo = this.passUserInfo.bind(this)
  }
  toggleSignInModal(){
    this.setState({showSignInModal: !this.state.showSignInModal})
  }
  handleOverlay(body){
    setTimeout(()=>{
      this.setState({showOverlay: true, overlayBody: body})
      setTimeout(()=>{this.setState({showOverlay: false})},1500)
    },500)
  }
  signin(data){
    this.setState({signin: !this.state.signin, userInfo: data})
  }
  signOut(){
    this.toggleConfirmMessage()
    this.handleOverlay("Sucessfully Signed Out!")
    this.setState({signin: !this.state.signin, userInfo: []})
  }
  toggleConfirmMessage(body){
    this.setState({ toggleConfirmMessage: !this.state.toggleConfirmMessage,
                    confirmMessage: body})
  }
  togglePostModal(){
    this.setState({showPostModal: !this.state.showPostModal})
  }
  passUserInfo(){
    return this.state.signin ? this.state.userInfo.id : null
  }
  render() {
    return(
      <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand logo">Cloth Road</div>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li><Link to='/'>Style</Link></li>
              <li><a href="#" onClick={this.togglePostModal}><PostModal show={this.state.showPostModal} close={this.togglePostModal} userInfo={this.passUserInfo} showSuccessMessage={this.handleOverlay}/>Community</a></li>
            </ul>
            {this.state.signin ?
              <ul className="nav navbar-nav navbar-right">
                <li className="welcome">Welcome, {this.state.signin ? this.state.userInfo.last_name : null} {this.state.signin ? this.state.userInfo.first_name : null}</li>
                <li><a href="#" onClick={()=>this.toggleConfirmMessage("Sign Out")}><span className="glyphicon glyphicon-user"></span> Sign Out</a></li>
              </ul>
              :
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='/user-sign-up'><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                <li><a href="#" onClick={this.toggleSignInModal}><span className="glyphicon glyphicon-log-in">
                <SignInModal show={this.state.showSignInModal} close={this.toggleSignInModal}  signIn={this.signin} showSuccessMessage={this.handleOverlay}/>
                </span> Login</a></li>
              </ul>
            }
          </div>
        </div>
      </nav>
      {this.state.showOverlay ? <SucessMessage show={this.state.showOverlay} body={this.state.overlayBody}/> : null }
      <ConfirmMessage show={this.state.toggleConfirmMessage} body={this.state.confirmMessage} close={this.toggleConfirmMessage} signOut={this.signOut}/>
      <RouteHandler {...this.props}/>
      </div>
    );
  }
};
