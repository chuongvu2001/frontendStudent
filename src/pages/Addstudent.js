import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './component/Navbar.js';
import Sidebar from './component/Sidebar.js';
import axios from 'axios';
import swal from 'sweetalert';


class Addstudent extends Component {
    state = {
        name: "",
        email: "",
        address: "",
        error_list: [],
        classroom: [],
        class: [],
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:8000/api/admin/classroom');
        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            this.setState({
                classroom: response.data.classroom,
                loading: false
            })
        }
        else {
            this.props.history.push("/login");
        }
    }

    hanleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    // hanleCheckbox = (e) =>{
    //     const clicked = this.state.checked.indexOf(e);
    //     const all = [...this.state.checked];
    //     if (clicked === -1) {
    //       all.push(e);
    //     } else {
    //       all.splice(clicked, 1);
    //     }
    //     console.log(all);
    // }


    saveStudent = async (e) => {
        e.preventDefault();
        // console.log(this.state);
        const response = await axios.post('http://localhost:8000/api/admin/add-student', this.state);
        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            swal({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                button: "OK!"
            });
            this.setState({
                name: '',
                email: '',
                address: '',
                class: '',
            });
        }
        else {
            this.setState({
                error_list: response.data.validate_err,
            });
        }
    }
    render() {
        var CLASS_TABLE = '';
        CLASS_TABLE = this.state.classroom.map((item) => {
    
            return (
                <option value={item.id}>{item.name}</option>
                // <div className="form-check" key={item.id}>
                //     <input className="form-check-input" checked={this.state.check} value={item.id} type="checkbox" name="class" onChange={this.hanleCheckbox} defaultValue id="flexCheckDefault" />
                //     <label className="form-check-label" htmlFor="flexCheckDefault">
                //         {item.name}
                //     </label>
                // </div>
            );
        });


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

                                        <Link to={'/students'} className="btn btn-sm btn-outline-secondary">Back</Link>
                                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
                                    </div>
                                    {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar" />
                                        This week
                                    </button> */}
                                </div>
                            </div>
                            <h2>Add Student</h2>
                            <form onSubmit={this.saveStudent} noValidate>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" className="form-control" onChange={this.hanleInput} value={this.state.name} />
                                    <span className="text-danger">{this.state.error_list.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" onChange={this.hanleInput} value={this.state.email} />
                                    <span className="text-danger">{this.state.error_list.email}</span>
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control"  onKeyPress={this.hanleInput} value={this.state.image} id="image"  />
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" name="address" className="form-control" onChange={this.hanleInput} value={this.state.address} />
                                    <span className="text-danger">{this.state.error_list.address}</span>
                                </div>
                                <div className="mb-3">
                                    <select class="form-select" onChange={this.hanleInput} name="class">
                                        <option selected>Classroom</option>
                                        {CLASS_TABLE}
                                    </select>
                                    {/* {CLASS_TABLE} */}
                                
                                    <span className="text-danger">{this.state.error_list.class}</span>
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