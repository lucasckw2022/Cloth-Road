class ImageModal extends React.Component{
  render(){
    return(
        <Modal
        className="image-modal"
        show={this.props.show}
        onHide={this.props.close}>
          <Modal.Body>
            <img src={this.props.link} />
            <a href={this.props.provider} target="_blank">@{this.props.source}</a>
          </Modal.Body>
        </Modal>
    )
  }
}

class SignInModal extends React.Component{
  render(){
    var userSignInFormProps = { close:              this.props.close,
                                showSuccessMessage: this.props.showSuccessMessage,
                                signIn:             this.props.signIn}
    return(
      <Modal
      className="sign-in-modal"
      show={this.props.show}
      onHide={this.props.close}>
        <Modal.Body>
          <UserSignInForm {...userSignInFormProps}/>
        </Modal.Body>
      </Modal>
    )
  }
}

class SucessMessage extends React.Component{
  render(){
    return(
      <Fade in={this.props.show} >
          <div className="success-message alert alert-success">
            <div><span className="glyphicon glyphicon-ok"></span> {this.props.body}</div>
          </div>
      </Fade>
    )
  }
}

class ConfirmMessage extends React.Component{
  render(){
    return(
      <Modal
      bsSize="sm"
      className="confirm-message"
      show={this.props.show}
      onHide={this.props.close}>
        <Modal.Body>
          <div>Are You Sure To {this.props.body}?</div>
          <span className="btn btn-success" onClick={this.props.signOut}>Yes</span>
          <span className="btn btn-default" onClick={()=>this.props.close()}>No</span>
        </Modal.Body>
      </Modal>
    )
  }
}

class PostModal extends React.Component{
  render(){
    var postFormProps = { close:              this.props.close,
                          userInfo:           this.props.userInfo,
                          showSuccessMessage: this.props.showSuccessMessage}
    return(
      <Modal
      className="post-modal"
      show={this.props.show}
      onHide={this.props.close}
      bsSize="lg">
        <Modal.Body>
          <PostContainer {...postFormProps}/>
        </Modal.Body>
      </Modal>
    )
  }
}
