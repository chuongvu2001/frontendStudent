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
import Logout from './pages/Logout.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/students" component={Student} />
        <Route exact  path="/add-student" component={Addstudent} />
        <Route exact  path="/edit-student/:id" component={Editstudent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout}/>
      </Switch>
    </Router>
  );
}

export default App;
