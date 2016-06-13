class ImageSlider extends React.Component{
  constructor(props){
    super(props);
    this.state = {index:     0,
                  direction: null};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleSelect(index,current){
    this.setState({ index: index,
                    direction: current.direction})
  }
  handleClick(link,provider,source){
    this.props.onClick(link, provider, source);
  }
  render(){
    var style = {
      minHeight: "92vh",
      maxHeight: "92vh"
    }
    var carouselItems = this.props.images.map(image => {
      if(this.props.imageType == image.styleType){
        return (
          <Carousel.Item key={image.id}>
          <img style={style} src={image ? image.link : null} onClick={()=>this.handleClick(image.link, image.provider, image.source)} />
          <Carousel.Caption>
          </Carousel.Caption>
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
  handleClick(){
    this.props.onClick(this.props.link, this.props.provider, this.props.source);
  }
  render(){
    return(
        <div className="images col-sm-6">
          <img src={this.props.link} onClick={this.handleClick}/>
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
    if(HistoryLocation.getCurrentPath()=="/lady-style"){
      this.setState({imageType: "Female"})
    } else if (HistoryLocation.getCurrentPath()=="/gentleman-style"){
      this.setState({imageType: "Male"})
    }
    $.ajax({
      url: "/photos.json",
      method: "GET"
    }).
    done((data) => {
      for(var i = data.length; i > 0; i--){
        if(!data[i-1].published){ data.splice([i-1],1);}
      }
    }).
    then((data) => {
      var sliderImages = []
      var refinedList = []
      for(var i = 0; i< data.length;i++){
        if(data[i].styleType == "Male" && sliderImages.length < 3){
          sliderImages.push(data[i])
          data.splice(i,1)
        }
      }
      for(var i = 0; i< data.length;i++){
        if(data[i].styleType == "Female" && sliderImages.length < 6){
          sliderImages.push(data[i])
          data.splice(i,1)
        }
      }
      for(var i = 0; i < data.length; i++){
          if(data[i].styleType === this.state.imageType){
            refinedList.push(data[i])
          }
      }
      var newList = this.state.images.concat(refinedList);
      this.setState({sliderImages: sliderImages, images: newList})
    })
  }
  checkImageType(){
    var newImages = this.state.images.slice()
    for(var i = 0; i < newImages.length; i++){
        if(newImages[i].styleType == this.state.imageType){
          newImages.splice(i,1)
        }
    }
    debugger
    this.setState({images: newImages})
  }
  printImage(){
      return(
      this.state.images.slice(((this.state.activePage-1)*4),(this.state.activePage*4)).map((image) => {
        return <Image link={image.link} provider={image.provider} source={image.source} key={image.id} onClick={this.openModal}/>
      })
    )
  }
  openModal(link, provider, source){
    this.setState({showModal: true, imageLink:[link,provider,source]})
  }
  closeModal(){
    this.setState({showModal: false})
  }
  handleSelect(eventKey){
    this.setState({activePage: eventKey});
  }
  countPage(){
    if(this.state.images.length%4==0){
      return this.state.images.length/4
    }else{
    return (this.state.images.length/4)+1
    }
  }
  render(){
    return(
      <div className="image-container">
        <ImageSlider onClick={this.openModal} images={this.state.sliderImages} imageType={this.state.imageType}/>
        <div className="image-item col-sm-6">
          {()=>{this.componentWillMount()}}
          {this.printImage()}
        </div>
        <ImageModal show={this.state.showModal} close={this.closeModal} link={this.state.imageLink[0]} provider={this.state.imageLink[1]} source={this.state.imageLink[2]} />
          <Pagination
          ellipsis
          boundaryLinks
          maxButtons={6}
          items={this.countPage()}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
      </div>
    )
  }
}
