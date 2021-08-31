import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Student from './pages/Student';
import Addstudent from './pages/Addstudent';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/students" component={Student} />
        <Route  path="/add-student" component={Addstudent} />
      </Switch>
    </Router>
  );
}

export default App;
