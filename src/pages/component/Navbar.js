import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    
    render() {
        var NavBar = "";
        if(sessionStorage.getItem('confirmed') == 1){
            NavBar = <Link to={'/logout'}>Logout</Link>
        }
        else{
            NavBar = <Link to={'/login'}>Login</Link>
        }
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Navbar</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        {NavBar}
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar