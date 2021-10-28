import {
  BrowserRouter as Router,
  Link, Route, Switch, useParams
} from 'react-router-dom';
import { Login, CreateRoom, Register, Lobby, GameSettings, QuizInProgress, EndGame, Home} from './pages';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import Liderboard from './components/Leaderboard';
import NavigationBar from './components/NavBar/NavigationBar';
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
            <BarChart/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/room">
            <CreateRoom />
          </Route>
          <Route exact path="/lobby/:room">
            <Lobby />
          </Route>
          <Route exact path="/settings/:room">
            < GameSettings />
          </Route>
          <Route exact path="/game/:room">
            < QuizInProgress />
          </Route>
          <Route exact path="/finish/:room">
            < EndGame />
          </Route>
          <Route exact path="/liderboard">
            < Liderboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
