import {
  BrowserRouter as Router,
  Link, Route, Switch
} from 'react-router-dom';
import * as Pages from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Pages.Login />
          </Route>
          <Route exact path="/register">
            <Pages.Register />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
