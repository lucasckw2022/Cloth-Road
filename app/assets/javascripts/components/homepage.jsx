class Homepage extends React.Component{
  constructor(props){
    super(props);
    this.state = {style: "homepage"}
    this.toMaleLink = this.toMaleLink.bind(this)
    this.toFemaleLink = this.toFemaleLink.bind(this)
  }
  toMaleLink(event){
    event.preventDefault();
    this.setState({style: "homepage animate-male"});
    //go to male style main page
    setTimeout(()=>{HistoryLocation.push("/gentleman-style")},1000)
  }
  toFemaleLink(event){
    event.preventDefault();
    this.setState({style: "homepage animate-female"});
    //go to female style main page
    setTimeout(()=>{HistoryLocation.push("/lady-style")},1000)
  }
  render(){
    return(
      <div className={this.state.style}>
        <center className="logo">Cloth Road</center>
        <div className="male">
          <img src="./assets/images/male.png" />
          <div className="redirect to-male" onClick={this.toMaleLink}>Gentleman</div>
        </div>
        <div className="female">
          <img src="https://killorglinrowing.files.wordpress.com/2012/02/fashionshowkillorglinrc.png" />
          <div className="redirect to-female" onClick={this.toFemaleLink}>Lady</div>
        </div>
      </div>
    )
  }
}
