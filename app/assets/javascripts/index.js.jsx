var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute,
    RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link,
    HistoryLocation = ReactRouter.HistoryLocation,
    Modal = ReactBootstrap.Modal,
    Fade = ReactBootstrap.Fade,
    Carousel = ReactBootstrap.Carousel,
    Redirect = ReactRouter.Redirect,
    Well = ReactBootstrap.Well,
    Pagination = ReactBootstrap.Pagination;

this.MyRoutes = (
  <Route handler={Main}>
    <DefaultRoute handler={Homepage}/>
    <Route handler={Homepage} path='/'/>
    <Route handler={ImageContainer} path='lady-style'/>
    <Route handler={ImageContainer} path='gentleman-style'/>
    <Route handler={UserSignUpForm} path='user-sign-up'/>
    <Route handler={PostForm} path='post-form'/>
  </Route>
);
