import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './component/Navbar.js';
import Sidebar from './component/Sidebar.js';
import axios from 'axios';
import swal from 'sweetalert';


class EditClass extends Component {
    state = {
        name: '',
        building: '',
        classroom: [],
        error_list: [],
    }
    hanleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {
        const stu_id = this.props.match.params.id;
        // console.log(stu_id);
        const response = await axios.get(`http://localhost:8000/api/admin/edit-classroom/${stu_id}`);
        // console.log(response.data.student.name);

        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            this.setState({
                name: response.data.classroom.name,
                building: response.data.classroom.building,
            });
        }
        else{
            this.props.history.push("/login");
        }
    }
    updateStudent = async (e) => {
        e.preventDefault();
        // console.log(this.state);
        document.querySelector('#update-btn').disable = true;
        document.querySelector('#update-btn').innerText = "Updating...";
        const stu_id = this.props.match.params.id;
        const response = await axios.put(`http://localhost:8000/api/admin/update-classroom/${stu_id}`,this.state);
        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            // console.log(response.data.message);
            swal({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                button: "OK!"
            });
            document.querySelector('#update-btn').disable = false;
            document.querySelector('#update-btn').innerText = "Update Submit";

        }
        else {
            this.setState({
                error_list: response.data.validate_err,
            });
        }
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
                                    <div className="btn-group mes-2">
                                        <Link to={'/students'} className="btn btn-sm btn-outline-secondary">Back</Link>
                                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
                                    </div>
                                    {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar" />
                                        This week
                                    </button> */}
                                </div>
                            </div>
                            <h2>Edit Student</h2>
                            <form onSubmit={this.updateStudent}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" className="form-control" onChange={this.hanleInput} value={this.state.name} />
                                    <span className="text-danger">{this.state.error_list.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Building</label>
                                    <input type="text" name="building" className="form-control" onChange={this.hanleInput} value={this.state.building} />
                                    <span className="text-danger">{this.state.error_list.building}</span>
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control"  onKeyPress={this.hanleInput} value={this.state.image} id="image"  />
                                </div> */}
                                <button type="submit" id="update-btn" className="btn btn-primary">Update Student</button>
                            </form>
                        </main>

                    </div>
                </div>
            </div >
        )
    }
}

export default EditClass