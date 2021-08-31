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
import Editstudent from './pages/Editstudent';
import Login from './pages/Login.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/students" component={Student} />
        <Route  path="/add-student" component={Addstudent} />
        <Route  path="/edit-student/:id" component={Editstudent} />
        <Route  path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
