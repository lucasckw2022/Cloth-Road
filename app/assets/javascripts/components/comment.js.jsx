class CommentContainer extends React.Component{
  constructor(props){
    super(props);
  }
  printComments(){
    return this.props.comments.map((comment)=>{
      return (
        <div className="comments" key={comment.id}>
          <div className="col-sm-3"><strong>{comment.user.first_name} {comment.user.last_name}:</strong></div>
          <div className="col-sm-9">{comment.body}</div>
        </div>
      )
    })
  }
  render(){
    return(
      <div>{this.printComments()}</div>
    )
  }
}

class CommentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {error: ""}
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit(event){
    event.preventDefault();
    this.setState({error: ""});
    var body = this.refs.body.value.trim()
    var user_id = this.props.userInfo()
    var post_id = this.props.post
    $.ajax({
      url: 'http://localhost:3000/posts/'+ post_id+'/comments',
      method: 'POST',
      data: {body: body, post_id: post_id, user_id: user_id},
    }).
    done((data)=>{
      if(data.errors){
        this.setState({error: data.errors[0]})
      } else{
        this.props.changeToPosts()
        this.props.showCommentForm()
        this.props.showSuccessMessage("Created Comment SuccessFully!")
      }
    })
  }
  printError(){
    if(this.state.error != ""){
      return <li>{this.state.error}</li>
    }
  }
  render(){
    return(
      <div className="comment-form">
        <h3>New Comment:</h3>
        <ul className="error_message">
          {this.printError()}
        </ul>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <textarea className="form-control" type="email" ref="body" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input className="btn btn-primary" type="submit" value="Create Post" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
