import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';







const Test = () => {

    const navigate = useNavigate();

//Modal
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
//Modal

const [emailVerif, setEmailVerif] = useState('');
//sendMailToResetPasswordFunction

const handleVerif = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/password', {emailVerif})
      .then((response) => {
        console.log(response.data);
        toast.info(response.data);
        if (response.data === 'Code sent to your email !') {
            navigate("/changerPassword")
          }
        // Do something with the response, like show a success message
      })
      .catch((error) => {
        console.log(error);
       
        // Do something with the error, like show an error message
      });}
      




     const [values,setValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        occupation: '',
        password: '',
     })

    const {firstName,lastName,phone,email,occupation,password} = values ;

    const handleChange = firstName => (e) => {
    //    console.log(e.target.value);
        setValues({...values,[firstName]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const signUser = await axios.post('/api/signup' ,{
                firstName,
                lastName,
                email,
                phone,
                occupation,
                password

            })
            console.log(signUser)

            if(signUser.data.success == true){
                setValues({firstName: '',lastName: '', email: '', phone:'', occupation: '',password:''})
            }
        } catch (error) {
            console.log();
        }
    }

    const handlesubmitt = async (e) =>{
        e.preventDefault();
        try {
            const login = await axios.post('/api/login' ,{
                
                email,
                password

            })
            console.log(login)

            if(login.data.success == true){
                setValues({ email: '',password:''})
            }
        } catch (error) {
            console.log();
        }
    }
  return (
    <>
    <main>
        <div className="main-wrapper pb-0 mb-0">
            <div className="timeline-wrapper">
                <div className="timeline-header">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters align-items-center">
                            <div className="col-lg-6">
                                <div className="timeline-logo-area d-flex align-items-center">
                                    <div className="timeline-logo">
                                        <a href="index.html">
                                            <img src="assets/images/logo/logo.png" alt="timeline logo"/>
                                        </a>
                                    </div>
                                    <div className="timeline-tagline">
                                        <h6 className="tagline">It’s helps you to connect and share with the people in your life</h6>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="login-area">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-sm">
                <input onChange={handleChange("email")}  type="email" className="single-field" placeholder="Email" value={email}/>
                                        </div>
                                        <div className="col-12 col-sm">
                 <input   onChange={handleChange("password")}  type="password" className="single-field" placeholder="Password" value={password}/>
                                        </div>
                                        <div className="col-12 col-sm-auto">
                                        <button  onClick={handlesubmitt} className="submit-btn">login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="timeline-page-wrapper">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <div className="timeline-bg-content bg-img" data-bg="assets/images/timeline/adda-timeline.jpg">
                                    <h3 className="timeline-bg-title">Let’s see what’s happening to you and your world. Welcome in Give Back.</h3>
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center">
                                <div className="signup-form-wrapper">
                                    <h1 className="create-acc text-center">Create An Account</h1>
                                    <div className="signup-inner text-center">
                                        <h3 className="title">Wellcome to Adda</h3>
                                        <form className="signup-inner--form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <input onChange={handleChange("email")}  type="email" className="single-field" placeholder="Email" value={email}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <input onChange={handleChange("firstName")}  type="text" className="single-field" placeholder="First Name" value={firstName}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <input  onChange={handleChange("lastName")}  type="text" className="single-field" placeholder="Last Name" value={lastName}/>
                                                </div>
                                                <div className="col-12">
                                                    <input   onChange={handleChange("password")}  type="password" className="single-field" placeholder="Password" value={password}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <select className="nice-select" name="sortby">
                                                        <option value="trending">Gender</option>
                                                        <option value="sales">Male</option>
                                                        <option value="sales">Female</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <select className="nice-select" name="sortby">
                                                        <option value="trending">Age</option>
                                                        <option value="sales">18+</option>
                                                        <option value="sales">18-</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <select className="nice-select" name="sortby">
                                                        <option value="trending">Country</option>
                                                        <option value="sales">Bangladesh</option>
                                                        <option value="sales">Noakhali</option>
                                                        <option value="sales">Australia</option>
                                                        <option value="sales">China</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <input onChange={handleChange("phone")}  type="text" className="single-field" placeholder="Phone number" value={phone} />
                                                </div>
                                                <div className="col-12">
                                                    <input onChange={handleChange("occupation")}  type="text" className="single-field" placeholder="your occupation" value={occupation} />
                                                </div>
                                                <div className="col-12">
                                                    <button  onClick={handleSubmit} className="submit-btn">Create Account</button>
                                                </div>
                                            </div>
                                            <h6 className="terms-condition">Forget your password ?! <a  onClick={handleShow}>Click here</a></h6>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      
</main>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleVerif}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name='email'
               
                value={emailVerif}
                onChange={(e) => setEmailVerif(e.target.value)}
              />
            </Form.Group>
           
          </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type='submit' onClick={handleVerif}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</>
  )
}

export default Test
