import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './component/Navbar.js';
import Sidebar from './component/Sidebar.js';
import axios from 'axios';
import swal from 'sweetalert';


class Editstudent extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        classroom: [],
        class: "",
        data_class:[],
        error_list: [],
        class_id: '',

    }
    hanleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount() {
        const stu_id = this.props.match.params.id;
        // console.log(stu_id);
        const response = await axios.get(`http://localhost:8000/api/admin/edit-student/${stu_id}`);
        // console.log(response.data.student.name);

        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            this.setState({
                name: response.data.student.name,
                email: response.data.student.email,
                address: response.data.student.address,
                data_class: response.data.attr_student,
                classroom: response.data.classroom,
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
        const response = await axios.put(`http://localhost:8000/api/admin/update-student/${stu_id}`,this.state);
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
        // console.log(this.state.class);
        var DataClass = [];
        DataClass = this.state.data_class.forEach((item) => {
            // var classroom_id = item.classroom_id;
            this.state.class_id = item.classroom_id;
        });
        var CLASS_TABLE = '';
        CLASS_TABLE = this.state.classroom.map((item) => {
            if (item.id == this.state.class_id) {
                return (
                    <option key={item.id} selected value={item.id}>{item.name}</option>
                )
            } else {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    // <div className="form-check" key={item.id}>
                    //     <input className="form-check-input" checked={this.state.check} value={item.id} type="checkbox" name="class" onChange={this.hanleCheckbox} defaultValue id="flexCheckDefault" />
                    //     <label className="form-check-label" htmlFor="flexCheckDefault">
                    //         {item.name}
                    //     </label>
                    // </div>
                );
            }
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
                                    <select className="form-select" onChange={this.hanleInput} name="class">
                                        {CLASS_TABLE}
                                    </select>
                                    <span className="text-danger">{this.state.error_list.class}</span>
                                    {/* {CLASS_TABLE} */}

                                    <span className="text-danger">{this.state.error_list.class}</span>
                                </div>
                                <button type="submit" id="update-btn" className="btn btn-primary">Update Student</button>
                            </form>
                        </main>

                    </div>
                </div>
            </div >
        )
    }
}

export default Editstudent