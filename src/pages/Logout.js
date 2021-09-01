import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Logout extends Component {
    render(){
        sessionStorage.clear();
        this.props.history.push("/students");
        return(
            <div></div>
        )
    }
}

export default Logout