import {
  BrowserRouter as Router,
  Link, Route, Switch, useParams
} from 'react-router-dom';
import {Login, CreateRoom, Register, Lobby, GameSettings, QuizInProgress, EndGame} from './pages';
import { GameProvider } from './contexts/gameContext';
import './App.css';

function App() {

  const room = useParams()
  return (
    <div className="App">
      <Router>
        <GameProvider>
        <Switch>
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
            < GameSettings/>
          </Route>
          <Route exact path="/game/:room">
            < QuizInProgress/>
          </Route>
          <Route exact path="/finish/:room">
            < EndGame/>
          </Route>
         

        </Switch>
        </GameProvider>
      </Router>
    </div>
  );
}

export default App;
