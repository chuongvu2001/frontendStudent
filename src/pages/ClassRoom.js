import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from './component/Navbar.js';
import Sidebar from './component/Sidebar.js';
import axios from 'axios';
import swal from 'sweetalert';

class ClassRoom extends Component {
    state = {
        classroom: [],
        loading: true,
        search: '',
        search_data: []

    }
    async componentDidMount() {
        const response = await axios.get('http://localhost:8000/api/admin/classroom');
       
        if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200) {
            this.setState({
                classroom: response.data.classroom,
                loading: false
            })
        }
        else{
            this.props.history.push("/login");
        }
        
    }
    DeleteClass = async (e, id)=>{
        const clicked = e.currentTarget;
        clicked.innerText = "deleting..";
        const response = await axios.delete(`http://localhost:8000/api/admin/delete-classroom/${id}`);
        if(sessionStorage.getItem('confirmed') == 1 && response.data.status === 200){
            swal({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                button:"OK!"
              });
          clicked.closest("tr").remove();

          this.props.history.push("/classroom");
        //   console.log(response.data.message);
        }
    }

    // handleSearch = (e)=>{
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     });
    // }

    // submitSearch = async (e)=>{
    //     e.preventDefault();
    //     const response = await axios.post('http://localhost:8000/api/admin/search-student',this.state.search);
    //     if (sessionStorage.getItem('confirmed') == 1 && response.data.status === 200 ) {
    //         this.setState({
    //             search_data: response.data.search,
    //             loading: false
    //         })
    //     }
    //     else{
    //         this.props.history.push("/login");
    //     }
    // }
    render() {
        var student_table = "";
        if (this.state.loading) {

            student_table = <tr><td colSpan="5"><h2>Loading...</h2></td></tr>;
        }
        else {
           
            // if(this.state.search_data == true){
            //     // console.log('search: ',this.state.search_data);
            //     student_table = this.state.search.map((item) => {
            //         return (
            //             <tr key={item.id}>
            //                 <td>{item.id}</td>
            //                 <td>{item.name}</td>
            //                 <td>{item.email}</td>
            //                 <td>{item.address}</td>
            //                 <td><Link to={`/detail-student/${item.id}`}>Classroom</Link></td>
            //                 <td><Link to={`/edit-student/${item.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            //                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            //                     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            //                 </svg></Link>
            //                     <a href="javascript:;" onClick={(e)=>this.DeleteStudent(e, item.id)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            //                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            //                         <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            //                     </svg></a>
            //                 </td>
            //             </tr>
            //         );
            //     });
    
            // }
            // else{
                student_table = this.state.classroom.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.building}</td>
                            <td><Link to={`/detail-class/${item.id}`}>Students</Link></td>
                            <td><Link to={`/edit-classroom/${item.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg></Link>
                                <a href="javascript:;" onClick={(e)=>this.DeleteClass(e, item.id)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg></a>
                            </td>
                        </tr>
                    );
                });
            // }

        }
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
                                        <Link to={'add-classroom'} className="btn btn-sm btn-outline-secondary">Add Classroom</Link>
                                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
                                    </div>
                                    {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                        <span data-feather="calendar" />
                                        This week
                                    </button> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>ClassRoom</h2>
                                <form onSubmit={this.submitSearch}>
                                    <input type="text" value={this.state.search} onChange={this.handleSearch} name="search" placeholder="Tìm kiếm..." />
                                    <input  type="submit" className="mx-1" value="Tìm kiếm"/>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Building</th>
                                            <th scope="col">Detail</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="load">
                                        {student_table}
                                    </tbody>
                                </table>
                            </div>
                        </main>

                    </div>
                </div>
            </div >
        )
    }
}

export default ClassRoom