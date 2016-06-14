class PostForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {error: []}
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit(event){
    event.preventDefault();
    this.setState({error:[]})
    var title   = this.refs.title.value.trim()
    var body    = this.refs.body.value.trim()
    //set the props to get the user id from running the passUserInfo function in Main component in Main.jsx
    var user_id = this.props.userInfo()
    $.ajax({
      url: "http://localhost:3000/posts",
      method: 'POST',
      data: { title:    title,
              body:     body,
              user_id:  user_id},
    }).
    done((data)=>{
      //render the post list
      this.props.changeToPosts()
      this.props.showSuccessMessage()
    }).
    fail((xhr, status, err)=>{
      var error_list = [];
      for(err in xhr.responseJSON.errors){
        error_list.push(
          this.state.error.concat(err +" "+ xhr.responseJSON.errors[err][0])
        )
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
      <div className="post-form container">
        <h1>New Post</h1>
        <ul className="error_message">
          {this.printError()}
        </ul>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-3" for="title">Title:</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" ref="title" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="body">Content:</label>
            <div className="col-sm-9">
              <textarea className="form-control" ref="body" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-10">
              <input className="btn btn-primary" type="submit" value="Create Post" />
            </div>
          </div>
        </form>
        <a href="javascript:void(0)" className="btn btn-default" onClick={this.props.changeToPosts}>Back To Post List</a>
      </div>
    )
  }
}

class PostContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {posts: [],
                  post: [],
                  content: "posts",
                  toggleCommentForm: false}
    this.changeToPostForm = this.changeToPostForm.bind(this)
    this.changeToPosts    = this.changeToPosts.bind(this)
    this.changeToPost     = this.changeToPost.bind(this)
    this.toggleCommentForm  = this.toggleCommentForm.bind(this)
  }
  componentWillMount(){
    $.ajax({
      url: "/posts.json",
      method: "GET"
    }).
    then((data)=>{
      this.setState({posts: data})
    })
  }
  printPosts(){
    return this.state.posts.map((post)=>{
      return (
        <tr key={post.id}>
          <td>
            <a href="javascript:void(0)" onClick={()=>{this.changeToPost(post)}}>
              {post.title}
            </a>
          </td>
          <td>{post.user.first_name} {post.user.last_name}</td>
        </tr>
      )
    })
  }
  createContent(post){
    //render the posts/postForm/individual post by checking the state inside the modal
    if(this.state.content == "posts"){
      return this.showPosts()
    } else if(this.state.content == "postForm"){
      return this.showPostForm()
    } else if(this.state.content == "post"){
      //passing the individual post info as params
      return this.showPost(post)
    }
  }
  showPosts(){
    return(
        <div>
          <h1>Community</h1>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Post</th>
                <th>From</th>
              </tr>
              {this.printPosts()}
            </tbody>
          </table>
          {this.props.userInfo()==null ? null :
            <a
            href="javascript:void(0)"
            className="btn btn-default"
            onClick={this.changeToPostForm} >
              New Post
            </a>
          }
        </div>
      )
  }
  showPostForm(){
    return (
      <PostForm
      changeToPosts={this.changeToPosts}
      userInfo={this.props.userInfo}
      showSuccessMessage={
        ()=>{this.props.showSuccessMessage("Created Post SuccessFully!")}
      }
      close={this.props.close}/>
    )
  }
  showPost(){
    return(
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.body}</p>
        {this.state.toggleCommentForm == false ? null : <CommentContainer comments={this.state.post.comments}/> }
        {this.state.toggleCommentForm ?
          <CommentForm
          post={this.state.post.id}
          userInfo={this.props.userInfo}
          toggleCommentForm={this.toggleCommentForm}
          changeToPosts={this.changeToPosts}
          showSuccessMessage={this.props.showSuccessMessage}/>
          : null}
        {this.props.userInfo()==null ? null :
          <a
          href="javascript:void(0)"
          className="btn btn-default"
          onClick={this.toggleCommentForm}>
            New Comment
          </a>}
        <a
        href="javascript:void(0)"
        className="btn btn-default"
        onClick={this.changeToPosts}>
          Back To Post List
        </a>
      </div>
    )
  }
  changeToPosts(){
    this.setState({content: "posts"})
    //force updating and fetch the data from database
    this.forceUpdate(this.componentWillMount())
  }
  changeToPostForm(){
    this.setState({content: "postForm"})
  }
  changeToPost(post){
    //force updating and fetch the data from database
    this.forceUpdate(this.componentWillMount())
    this.setState({content: "post", post: post})
  }
  passPostInfo(){
    return this.state.post ? this.state.post.id : null
  }
  toggleCommentForm(){
    this.setState({toggleCommentForm: !this.state.toggleCommentForm})
  }
  render(){
    return(
      <div className="post-container container">
        {this.createContent()}
      </div>
    )
  }
}
