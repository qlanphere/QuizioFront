import {
  BrowserRouter as Router,
  Link, Route, Switch, useParams
} from 'react-router-dom';
import { Login, CreateRoom, Register, Lobby, GameSettings, QuizInProgress, EndGame, Home, NotFound} from './pages';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import Liderboard from './components/Leaderboard';
import NavigationBar from './components/NavBar/NavigationBar';
import * as CustomRoutes from "./routing";
import BarChart from './components/BarChart/index'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const room = useParams()
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <CustomRoutes.PrivateRoute exact path="/room">
            <CreateRoom />
          </CustomRoutes.PrivateRoute>
          <CustomRoutes.PrivateRoute exact path="/lobby/:room">
            <Lobby />
          </CustomRoutes.PrivateRoute>
          <CustomRoutes.PrivateRoute exact path="/settings/:room">
            < GameSettings />
          </CustomRoutes.PrivateRoute>
          <CustomRoutes.PrivateRoute exact path="/game/:room">
            < QuizInProgress />
          </CustomRoutes.PrivateRoute>
          <CustomRoutes.PrivateRoute exact path="/finish/:room">
            < EndGame />
          </CustomRoutes.PrivateRoute>
          <CustomRoutes.PrivateRoute exact path="/liderboard">
            < Liderboard />
          </CustomRoutes.PrivateRoute>
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
