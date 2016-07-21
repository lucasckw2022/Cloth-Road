class ImageSlider extends React.Component{
  constructor(props){
    super(props);
    this.state = {index:     0,
                  direction: null};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick  = this.handleClick.bind(this);
  }
  //For image slider
  handleSelect(index,current){
    this.setState({ index:      index,
                    direction:  current.direction})
  }
  //set the onClick props and takes in 3 params
  handleClick(link,provider,source){
    this.props.onClick(link, provider, source);
  }
  render(){
    var carouselItems = this.props.images.map(image => {
      if(this.props.imageType == image.styleType){
        return (
          <Carousel.Item key={image.id}>
            <img
            src={image ? image.link : null}
            onClick={()=>this.handleClick(image.link, image.provider, image.source)} />
          </Carousel.Item>)
      }
    });
    return(
      <Carousel className="col-sm-6" onSelect={this.handleSelect}>
       {carouselItems}
     </Carousel>
    )
  }
}


class Image extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  //set the onClick props and takes in 3 params
  handleClick(){
    this.props.onClick(this.props.link, this.props.provider, this.props.source);
  }
  render(){
    return(
        <div className="images col-sm-6">
          <img
          src={this.props.link}
          onClick={this.handleClick} />
        </div>
    );
  }
}

class ImageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {images:[],
                  sliderImages:[],
                  showModal: false,
                  imageLink: [],
                  activePage: 1,
                  imageType: "Female"}

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
    this.printImage = this.printImage.bind(this)
  }
  componentWillMount(){
    //get the male or female images after selecting the style
    if (HistoryLocation.getCurrentPath()=="/lady-style"){
      this.setState({imageType: "Female"})
    } else if (HistoryLocation.getCurrentPath()=="/gentleman-style"){
      this.setState({imageType: "Male"})
    }
    $.ajax({
      url:    "/photos.json",
      method: "GET"
    }).
    done((data) => {
      //check if the image are published
      for(var i = data.length; i > 0; i--){
        if(!data[i-1].published){ data.splice([i-1],1);}
      }
    }).
    then((data) => {
      var sliderImages = []
      var refinedList = []
      //get the first three male images
      for(var i = 0; i< data.length;i++){
        if(data[i].styleType == "Male" && sliderImages.length < 3){
          sliderImages.push(data[i])
          data.splice(i,1)
        }
      }
      //get the first three female images after getting the male images
      for(var i = 0; i< data.length;i++){
        if(data[i].styleType == "Female" && sliderImages.length < 6){
          sliderImages.push(data[i])
          data.splice(i,1)
        }
      }
      //push either female or male images to the array
      for(var i = 0; i < data.length; i++){
          if(data[i].styleType === this.state.imageType){
            refinedList.push(data[i])
          }
      }
      //change the state for slider images and the mainpage images
      var newList = this.state.images.concat(refinedList);
      this.setState({sliderImages: sliderImages, images: newList})
    })
  }
  //iterate through the images state and print it on the page using Image component
  printImage(){
      return(
      //only print the corresponding images after selecting the pagination
      this.state.images.slice(((this.state.activePage-1)*4),(this.state.activePage*4)).map((image) => {
        return <Image link={image.link} provider={image.provider} source={image.source} key={image.id} onClick={this.openModal}/>
      })
    )
  }
  //open modal and pass it link (for showing image), provider(for showing the name of the source) and source(for getting the link to its facebook)
  openModal(link, provider, source){
    this.setState({showModal: true, imageLink:[link,provider,source]})
  }
  //close the modal by setting state to false
  closeModal(){
    this.setState({showModal: false})
  }
  //For pagination
  handleSelect(eventKey){
    this.setState({activePage: eventKey});
  }
  //Calculate the maximum page for pagination
  countPage(){
    if(this.state.images.length%4==0){
      return this.state.images.length/4
    } else {
    return (Math.floor(this.state.images.length/4)+1)
    }
  }
  render(){
    return(
      <div className="image-container">
        <ImageSlider
        onClick={this.openModal}
        images={this.state.sliderImages}
        imageType={this.state.imageType}/>
        <div className="image-item col-sm-6 col-xs-12">
          {this.printImage()}
        </div>
        <ImageModal
        show={this.state.showModal}
        close={this.closeModal}
        link={this.state.imageLink[0]}
        provider={this.state.imageLink[1]}
        source={this.state.imageLink[2]} />
        <Pagination
        ellipsis
        boundaryLinks
        maxButtons={5}
        items={this.countPage()}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
      </div>
    )
  }
}
