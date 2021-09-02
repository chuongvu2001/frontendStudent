import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to={'/classroom'}>ClassRoom</Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link to={'/students'}> Students</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default Sidebar