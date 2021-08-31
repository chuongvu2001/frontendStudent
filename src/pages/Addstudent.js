import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './component/Navbar.js';
import Sidebar from './component/Sidebar.js';
import axios from 'axios';

class Addstudent extends Component {
    state={
        name:'',
        email:'',
        address:''
    }
    hanleInput= (e)=>{
        this.setState({
            [e,target.name]: e.target.value
        })
    }
    saveStudent = async (e)=>{
        e.preventDefault();
        const response = await axios.post('/api/add-student',this.state);

    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Dashboard</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="btn-group me-2">
                                        <Link to={'students'} className="btn btn-sm btn-outline-secondary">Students</Link>
                                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
                                    </div>
                                    {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar" />
                                        This week
                                    </button> */}
                                </div>
                            </div>
                            <h2>Section title</h2>
                            <form onSubmit={this.saveStudent}>
                                <div className="mb-3">
                                    <label  className="form-label">Name</label>
                                    <input type="text" className="form-control" onChange={this.hanleInput} value={this.state.name} id="Name"  />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control"  onChange={this.hanleInput} value={this.state.email} id="email"  />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control"  onChange={this.hanleInput} value={this.state.image} id="image"  />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control"  onChange={this.hanleInput} value={this.state.address} id="address"  />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </main>

                    </div>
                </div>
            </div >
        )
    }
}

export default Addstudent