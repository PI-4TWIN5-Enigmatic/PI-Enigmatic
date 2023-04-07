import React, { useState,useEffect } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleButton from 'react-google-button'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';

import { useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";



function Signup() {

    const [_, setCookies] = useCookies(["access_token"]);

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



            //GOOGLE_SIGN_IN
             const location = useLocation();
            const [token, setToken] = useState("");
            const [userId, setUserId] = useState("");
            const getUser = async () => {

                const response = await fetch (`http://localhost:8000/api/getuser/${window.localStorage.getItem("id")}` , {
                method:"GET",
                headers: { Authorization: `Bearer ${token}` },
                });
            
                const data = await response.json();
                window.localStorage.setItem("user",JSON.stringify(data));
                console.log(data);
            };
            
            useEffect(() => {
                const params = new URLSearchParams(location.search);
                const token = params.get("token");
                const userId = params.get("userId");
                setToken(token);
                setUserId(userId);
                
                if(token){
                    setCookies("access_token", token);
                    window.localStorage.setItem("id", userId);
                    window.localStorage.setItem("token", token);
                    getUser();
                    navigate(`/profile/${userId}`);

                }
            }, [location.search]);

            const signInGoogle=()=>{
        
                window.location.replace("http://localhost:8000/auth/google");
            
          }
          //END_GOOGLE_SIGN_IN

        
        


        


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [sexe, setSexe] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [emaill, setEmaill] = useState('');



    const [errors,setErrors] = useState(
        {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            occupation: '',
            password: '',
            profilePicture:'',
            sexe:'',
            recaptcha:'',

        }
    )


    const formValidation = () => {
        
        let etat = true ;
        let localError = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            occupation: '',
            password: '',
            profilePicture:'',
            sexe:'',
            recaptcha:'',

        }
        if(firstName === "" ){
           localError.firstName = " Firstname required" ;
           etat = false;
        }
        if(lastName === "" ){
            localError.lastName = " Lastname required" ;
            etat = false;

         }
         if(phone === "" ){
            localError.phone = " Phone required" ;
            etat = false;

        }
        if(email === "" ){
            localError.email = " Email required" ;
            etat = false;

         }
         if(occupation === "" ){
            localError.occupation = " occupation required" ;
            etat = false;

         }
         if(sexe === "" ){
            localError.sexe = " Gender required" ;
            etat = false;

         }
         if(password === "" || password.length <8 ){
            localError.password = " Password required ans min 8 caracters" ;
            etat = false;

         }
         if(profilePicture === "" ){
            localError.profilePicture = " ProfilePicture required " ;
            etat = false;

         }
         if(recaptcha === "" ){
            localError.recaptcha = " Recaptcha required " ;
            etat = false;

         }

         setErrors(localError)
        //  console.log(localError)
         return etat ; 
          

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = formValidation();
        if(isFormValid){
            const dataimg = new FormData()
            dataimg.append("file",profilePicture)
            dataimg.append("upload_preset","enigmatic")
            dataimg.append("cloud_name","dtisuumvj")
            axios.post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",dataimg)
            .then((result)=> {
                console.log(result.data.secure_url)

            const data = {
                firstName,
                lastName,
                phone,
                email,
                occupation,
                password,
                profilePicture: result.data.secure_url,
                sexe,
                recaptcha,
    
            }

            axios.post('http://localhost:8000/api/signup',data)
            .then(response => {
                console.log(response);
                toast.success("Please check your email account")
                navigate("/verif")
                // Handle success response
            })
            .catch(error => {
                console.error(error);
                // Handle error response
            });
            
            })

            

        }else{
            console.log("form invalid")
        }

      };


   
   

  

  
      const handleSubmitt = async (e) => {
        e.preventDefault();
        console.log(passwordd,emaill)
        try {
            
            const login = await axios.post('http://localhost:8000/api/login-user', {
                emaill,
                passwordd,
            })

           
           
            console.log(login)

            if (login.data.success == true) {


              //  setValues({ email: '', password: ''})
              
              setCookies("access_token", login.data.token);

              
              window.localStorage.setItem('user', JSON.stringify(login.data.user));
                console.log(login.data.user.isActive)
                if (!login.data.user.isActive) {
                            await axios.post(`http://localhost:8000/api/activateAccount/${login.data.user._id}`)
                }

                
                
               
                if (login.data.user.isAdmin) {
                    toast.info("Admin logged in ")

                    

                    window.location.href = "http://localhost:4000/#/redirection/"+login.data.token

                } else {

                    window.localStorage.setItem("id", login.data.id);


                    window.localStorage.setItem("token", login.data.token);


                    
  
                    
                    toast.info("User logged in ")



                    navigate('/profile/' + login.data.user._id);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    const [recaptcha, setRecaptchaValue] = useState('');
    const SITE_KEY ='6Lc5RvskAAAAAGjZouqU3C4sFmAeUpjJ0UD9ErRK'

    const  onChange = value =>{
        setRecaptchaValue(value)
    }

  

  return (
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
                                            <img src="assets/images/logo/logoGive.jpg " style={{width : 100}} alt="timeline logo"/>
                                        </a>
                                    </div>
                                    <div className="timeline-tagline">
                                  
                                        <h6 className="tagline">It’s helps you to connect and share with the people in your life</h6>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="login-area" >
                                    <div className="row align-items-center">
                                        <div className="col-12 col-sm">
                                         <input onChange={(event) => setEmaill(event.target.value)}  type="email" className="single-field" placeholder="Email" value={emaill}/>
                                        </div>
                                        <div className="col-12 col-sm">
                                       <input    onChange={(event) => setPasswordd(event.target.value)}  type="password" className="single-field" placeholder="Password" value={passwordd}/>
                                        </div>
                                        <div className="col-12 col-sm-auto">
                                        <button  onClick={handleSubmitt} className="submit-btn" style={{borderRadius: 30}}>login</button>
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
                                  
                                <img src="assets/images/logo/logoGive.jpg " style={{width : 6000, height : 1000}} alt="timeline logo"/>
                                    {/* <h3 className="timeline-bg-title" style={{color: "red"}}>Let’s see what’s happening to you and your world. Welcome in Give Back.</h3> */}
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 d-flex align-items-center justify-content-center">
                                <div className="signup-form-wrapper" >
                                    <h1 className="create-acc text-center">Create An Account</h1>
                                    <div className="signup-inner text-center" style={{borderRadius: 30}}>
                                        <h3 className="title">Wellcome to Give Back</h3>
                                        <form className="signup-inner--form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <input  value={email}
                                                      onChange={(event) => setEmail(event.target.value)} type="email" className="single-field" placeholder="Email" />
                                                    {errors.email !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.email} </div> : ''}
                                                </div>
                                                <div className="col-md-6">
                                                    <input  onChange={(event) => setFirstName(event.target.value)}  type="text" className="single-field" placeholder="First Name" value={firstName}/>
                                                    {errors.firstName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px' , color: 'rgb(220,71,52)'}} >{errors.firstName} </div> : ''}
                                                </div>
                                                <div className="col-md-6">
                                                    <input   onChange={(event) => setLastName(event.target.value)}  type="text" className="single-field" placeholder="Last Name" value={lastName}/>
                                                    {errors.lastName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.lastName} </div> : ''}

                                                </div>
                                                <div className="col-12">
                                                    <input  onChange={(event) => setPassword(event.target.value)} type="password" className="single-field" placeholder="Password" value={password}/>
                                                    {errors.password !== " " ? <div style={{textAlign:'left', paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.password} </div> : ''}

                                                </div>
                                                <div className="col-md-12">
                                                    <select className="nice-select" onChange={(event) => setSexe(event.target.value)} value={sexe} name="sortby">
                                                        <option value="">Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                    {errors.sexe !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.sexe} </div> : ''}

                                                </div>
                                                <div className="col-12">
                                                    <input  onChange={(event) => setPhone(event.target.value)}  type="text" className="single-field" placeholder="Phone number" value={phone} />
                                                    {errors.phone !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.phone} </div> : ''}

                                                </div>
                                                <div className="col-12">
                                                    <select className="nice-select"  onChange={(event) => setOccupation(event.target.value)} value={occupation} name="sortby">
                                                        <option value="">Occupation</option>
                                                        <option value="Student">Student</option>
                                                        <option value="Employee">Employee</option>
                                                    </select>
                                                    {errors.occupation !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.occupation} </div> : ''}

                                                </div>
                                                <div className="col-12">
                                                    <input   onChange={(event) => setProfilePicture(event.target.files[0])}    type="file" accept=".png, .jpg, .jpeg" name="photo" />
                                                    {errors.profilePicture !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.profilePicture} </div> : ''}

                                                </div>
                                                <div className="col-12">
                                                    <ReCAPTCHA sitekey={SITE_KEY}
                                                    onChange={onChange}
                                                    />
                                                {errors.recaptcha !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.recaptcha} </div> : ''}

                                                </div> 
                                                <div className="col-12">
                                                    <button  onClick={handleSubmit} className="submit-btn" style={{borderRadius: 30}}>Create Account</button>
                                                 

                                                </div>

                                                <div className="col-12 ">
                                                    <div className="col-12 ">
                                                         <p>Or</p> 

                                                            <div>
                                                            <GoogleButton
                                                                type="light" // can be light or dark
                                                                onClick={ signInGoogle }
                                                                />
                                                                         
                                                            </div>
                    
                                                            </div>       
                                                    
                                                    </div>
                                                    <h6 className="terms-condition">Forget your password !? <a onClick={handleShow}>click here !</a></h6>

                                            </div>
                                            <h6 className="terms-condition">I have read & accepted the <a href="#">terms of use</a></h6>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
          <Button variant="danger" type='submit' onClick={handleVerif}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</main>
  )
}

export default Signup
