import React, { Component } from 'react';
// import './signin.css';
class Login extends Component {
    render() {
        return (
           <div className="container">
               <div className="row text-center">
               <main className="form-signin">
                <form>
                    <img className="mb-4" src="https://luatdongkhanh.com/wp-content/uploads/2019/11/art_eatlogos_design_for_pink.png" alt width={150} height={125} />
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {/* <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" defaultValue="remember-me" /> Remember me
                        </label>
                    </div> */}
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                    <p className="mt-5 mb-3 text-muted">© 2021</p>
                </form>
            </main>
               </div>
           </div>
        )
    }
}

export default Login