import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute/privateRoute'
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Admin = React.lazy(() => import('././views/Admin/AdminHome'))
// const Register = React.lazy(() => import('./views/Pages/Register'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  setLogged = (isCorrect) => {
    isCorrect ? this.setState({ logged: true }) : this.setState({ logged: false })
  }

  stillLogged = (isCorrect) =>{
    isCorrect ? this.setState({ logged: true }) : this.setState({ logged: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      logged: false
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token !== null && token !== undefined) {
      this.setState({ logged: true })
    }
    else {
      this.setState({ logged: false })
    }
  }

  render() {
    console.log(this.state.logged)
    return (
      <HashRouter hashType="noslash">
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login setLogged={this.setLogged} {...props} />} />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
            <PrivateRoute exact path="/admin" name="Admin" logged={this.state.logged} stillLogged={this.stillLogged} component={Admin} />
            <Route path="/Inicio" name="Landing Page" component={() => {
              window.location.href = "https://stc.rhippie.com/";
              return null;
            }} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
