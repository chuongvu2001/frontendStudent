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
import Signup from './pages/Signup.js';
import DetailStudent from './pages/DetailStudent.js';
import ClassRoom from './pages/ClassRoom.js';
import DetailClass from './pages/DetailClass.js';
import AddClass from './pages/AddClass.js';
import EditClass from './pages/EditClass.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/students" component={Student} />
        <Route exact  path="/add-student" component={Addstudent} />
        <Route exact  path="/edit-student/:id" component={Editstudent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/detail-student/:id" component={DetailStudent}/>
        <Route exact path="/classroom" component={ClassRoom} />
        <Route exact path="/detail-class/:id" component={DetailClass}/>
        <Route exact path="/add-classroom" component={AddClass} />
        <Route exact  path="/edit-classroom/:id" component={EditClass} />
      </Switch>
    </Router>
  );
}

export default App;
