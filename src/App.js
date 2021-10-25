import {
  BrowserRouter as Router,
  Link, Route, Switch
} from 'react-router-dom';
import {Login, CreateRoom, Register} from './pages';
import { GameProvider } from './contexts/gameContext';
import './App.css';

function App() {
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

        </Switch>
        </GameProvider>
      </Router>
    </div>
  );
}

export default App;
