import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Forfeits from './pages/Forfeits';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/forfeits">
          <Forfeits />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
