import React, { useState,useEffect } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';

import { useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import WcIcon from '@mui/icons-material/Wc';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import WorkIcon from '@mui/icons-material/Work';
import PhotoIcon from '@mui/icons-material/Photo';
import BadgeIcon from '@mui/icons-material/Badge';
import LockResetIcon from '@mui/icons-material/LockReset';
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
                });
            
                const data = await response.json();
                window.localStorage.setItem("user",JSON.stringify(data));
                console.log(data);
            };
            
            useEffect(() => {
                const params = new URLSearchParams(location.search);
                const tokenn = params.get("token");
                const userIdd = params.get("userId");
                setToken(tokenn);
                setUserId(userIdd);
                
                if(tokenn){
                    setCookies("access_token", tokenn);
                    window.localStorage.setItem("id", userIdd);
                    window.localStorage.setItem("token", tokenn);
                    getUser();
                    navigate(`/profile/${userIdd}`);

                }
            }, []);

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
//     <main style={{backgrounColor: "rgba(188, 188, 188, 0.26)"}}>
//         <div className="main-wrapper pb-0 mb-0">
//             <div className="timeline-wrapper">
//                 <div className="timeline-header  " >
                    
//                     <div className="container-fluid p-0">
//                     <div className="row no-gutters align-items-center">

//                     <div className="col ">


//                             <div className="col-lg-6 " >
//                                 <div className="login-area " style={{backgroundColor:'transparent'}}>

//                                     <div className="row align-items-center "  >
//                                         <div className="col-12 col-sm"   >
//                                          <input onChange={(event) => setEmaill(event.target.value)}  type="email" className="single-field" placeholder="Email" value={emaill} 
//                                              style={{ color: '#dc4734', WebkitTextFillColor: '#dc4734', opacity: 0.5  ,  borderBottomColor: '#dc4734' }}
//                                             />
//                                         </div>
//                                         <div className="col-12 col-sm">
//                                        <input    onChange={(event) => setPasswordd(event.target.value)}  type="password" className="single-field" placeholder="Password" value={passwordd}
//                                              style={{ color: '#dc4734', WebkitTextFillColor: '#dc4734', opacity: 0.5  ,  borderBottomColor: '#dc4734' }}

//                                        />
//                                         </div>
//                                         <div className="col-12 col-sm-auto">
//                                         <button  onClick={handleSubmitt} className="submit-btn" style={{borderRadius: 30 }}>login</button>
//                                         </div>
                                     

//                                     </div>
//                                 </div>
                                
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="timeline-page-wrapper">
//                     <div className="container-fluid p-0">
//                         <div className="row no-gutters">
//                             <div className="col-lg-6 order-2 order-lg-1">
//                                 <div className="timeline-bg-content bg-img" data-bg="assets/images/timeline/adda-timeline.jpg">
//                                 <br/> <br/>
//                                 <div className='main-wrapper'>
//                                 <div className="signup-inner text-center" style={{borderRadius: 30 }}>
//                                         <h3 className="title">Welcome to GiveBack</h3>
//                                         <form className="signup-inner--form">
//                                             <div className="row">
//                                                 <div className="col-12 d-flex">
//                                                     <EmailIcon style={{opacity: 0.69}}/>
//                                                     <input  value={email}
//                                                       onChange={(event) => setEmail(event.target.value)} type="email" className="single-field" placeholder="Email" />
//                                                     {errors.email !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.email} </div> : ''}
//                                                 </div>
//                                                 <div className="col-md-6 d-flex">
//                                                     <BadgeIcon style={{opacity: 0.69}}/>
//                                                     <input  onChange={(event) => setFirstName(event.target.value)}  type="text" className="single-field" placeholder="First Name" value={firstName} style={{width:"165px"}}/>
//                                                     {errors.firstName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px' , color: 'rgb(220,71,52)' , paddingRight:"20px" }} >{errors.firstName} </div> : ''}
//                                                     <input   onChange={(event) => setLastName(event.target.value)}  type="text" className="single-field" placeholder="Last Name" value={lastName} style={{width:"165px"}}/>
//                                                     {errors.lastName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.lastName} </div> : ''}

//                                                 </div>
//                                                 <div className="col-12 d-flex">
//                                                     <KeyIcon style={{opacity: 0.69}}/>
//                                                     <input  onChange={(event) => setPassword(event.target.value)} type="password" className="single-field" placeholder="Password" value={password} />
//                                                     {errors.password !== " " ? <div style={{textAlign:'left', paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.password} </div> : ''}

//                                                 </div>
//                                                 <div className="col-md-12 d-flex">
//                                                     <WcIcon style={{opacity: 0.69}}/>
//                                                     <select className="nice-select" onChange={(event) => setSexe(event.target.value)} value={sexe} name="sortby">
//                                                         <option value="">Gender</option>
//                                                         <option value="Male">Male</option>
//                                                         <option value="Female">Female</option>
//                                                     </select>
//                                                     {errors.sexe !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.sexe} </div> : ''}

//                                                 </div>
//                                                 <div className="col-12 d-flex">
//                                                     <WifiCalling3Icon style={{opacity: 0.69}}/>
//                                                     <input  onChange={(event) => setPhone(event.target.value)}  type="text" className="single-field" placeholder="Phone number" value={phone} />
//                                                     {errors.phone !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.phone} </div> : ''}

//                                                 </div>
//                                                 <div className="col-12 d-flex">
//                                                     <WorkIcon style={{opacity: 0.69}}/>
//                                                     <select className="nice-select"  onChange={(event) => setOccupation(event.target.value)} value={occupation} name="sortby">
//                                                         <option value="">Occupation</option>
//                                                         <option value="Student">Student</option>
//                                                         <option value="Employee">Employee</option>
//                                                     </select>
//                                                     {errors.occupation !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.occupation} </div> : ''}

//                                                 </div>
//                                                 <div className="col-12 d-flex">
//                                                     <PhotoIcon style={{opacity: 0.69}}/>
//                                                     <input   onChange={(event) => setProfilePicture(event.target.files[0])}    type="file" accept=".png, .jpg, .jpeg" name="photo" />
//                                                     {errors.profilePicture !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.profilePicture} </div> : ''}

//                                                 </div>
//                                                 <div className="col-12">
//                                                     <br/>
//                                                     <ReCAPTCHA sitekey={SITE_KEY}
//                                                     onChange={onChange}
//                                                     />
//                                                 {errors.recaptcha !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.recaptcha} </div> : ''}

//                                                 </div> 
//                                                 <div className="col-12">
//                                                     <button  onClick={handleSubmit} className="submit-btn" style={{borderRadius: 30}}>Create Account</button>
                                                 

//                                                 </div>

//                                                 <div className="col-12 justify-content-center  ">
//                                                     <div className="col-12 ">
//                                                          <>Or</> 

//                                                             <div>
//                                                             <GoogleButton
//                                                                 type="light" // can be light or dark
//                                                                 onClick={ signInGoogle }
//                                                                 />
                                                                         
//                                                             </div>
                    
//                                                             </div>       
                                                    
//                                                     </div>
//                                                     <h6 className="terms-condition" style={{paddingBottom:'10px' }}><LockResetIcon /> Forget your password !? <a onClick={handleShow}>click here !</a></h6>

//                                             </div>
//                                             {/* <h6 className="terms-condition">I have read & accepted the <a href="#">terms of use</a></h6> */}
//                                         </form>
//                                     </div>                                </div>
//                             </div>
//                             </div>
//                             <div className="col-lg-6 order-1 order-lg-1 d-flex align-items-center justify-content-center">

//                             <img src="assets/loogin.png " style={{width : 60000, height : 1000 }} alt="timeline logo" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
      //   <Modal show={show} onHide={handleClose}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Reset Password</Modal.Title>
      //   </Modal.Header>
      //   <Form onSubmit={handleVerif}>
      //       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      //         <Form.Label>Email address</Form.Label>
      //         <Form.Control
      //           type="email"
      //           placeholder="name@example.com"
      //           autoFocus
      //           name='email'
               
      //           value={emailVerif}
      //           onChange={(e) => setEmailVerif(e.target.value)}
      //         />
      //       </Form.Group>
           
      //     </Form>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={handleClose}>
      //       Close
      //     </Button>
      //     <Button variant="danger" type='submit' onClick={handleVerif}>
      //       Save Changes
      //     </Button>
      //   </Modal.Footer>
      // </Modal>
// </main>
<>

 <section className="text-center text-lg-start" style={{backgroundImage:"url('../../baaack.jpg')" ,  backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
          {/* <a className="navbar-brand" >
          <img
                      src="../../assets/enigmatic.jpg"
                      alt="brand logo"
                      style={{ width: "80px" , borderRadius: "50%" }}
                    />            GiveBack 
          </a> */}
          <div className="login-container" style={{  top: 0, right: 0 }}>

<div className='d-flex  justify-content-between ' style={{ paddingLeft:"30px" , alignItems:"center"}}>

        <div className="form-group justify-content-end ">
            
            <div className="d-flex flex-wrap align-items-center justify-content-between">

                <div className="d-flex align-items-center ">
                <div className="form-outline d-flex justify-content-between align-items-center  ">
                    <EmailIcon style={{ opacity: 0.69 }} />
                    <input type="email" class="form-control form-control-lg" value={emaill}  onChange={(event) => setEmaill(event.target.value)}  placeholder="Enter a valid email address" style={{  width: "90%" }} />

                </div>
                <div className="form-outline d-flex justify-content-between align-items-center ">
                    <KeyIcon style={{ opacity: 0.69 }} />
                    <input type="password" class="form-control form-control-lg" placeholder="Enter password" onChange={(event) => setPasswordd(event.target.value)}  value={passwordd}  style={{ width: "90%" }}/>
                </div>

                <button onClick={handleSubmitt} className="submit-btn " style={{ borderRadius: 30, width: "10%"  }}>login</button>
                </div>

            </div>
            </div>

            </div>
            </div>


         






  <div className="container py-4" >
    <div className="row g-0 align-items-center">
      <div className="col-lg-6 mb-5 mb-lg-0">
      <div className='d-flex align-items-center ' style={{paddingLeft:"70px"}} >

            <h1>Welcome To our community </h1>
            
            </div>
      <img src="assets/loogin.png" className="w-100 rounded-4 shadow-4"
          alt="" />
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0">
        
     
          <div className="card cascading-right" >

          <div className="card-body p-5 shadow-5 text-center">
                    
          <h2 className="fw-bold mb-5">Sign up now</h2>
              
                     <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text"  className="form-control"  onChange={(event) => setFirstName(event.target.value)}   value={firstName}  />
                    <label className="form-label"  >First name</label>
                      {errors.firstName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px' , color: 'rgb(220,71,52)' , paddingRight:"20px" }} >{errors.firstName} </div> : ''}

                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text"  className="form-control" onChange={(event) => setLastName(event.target.value)}  value={lastName} />
                    <label className="form-label" >Last name</label>
                    {errors.lastName !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.lastName} </div> : ''}

                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="email" className="form-control"  value={email}
                onChange={(event) => setEmail(event.target.value)} />
                <label className="form-label" >Email address</label>
                  {errors.email !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.email} </div> : ''}

              </div>

              <div className="form-outline mb-4">
                <input type="password"  className="form-control" onChange={(event) => setPassword(event.target.value)} value={password}/>
                <label className="form-label" >Password</label>
              </div>

              <div className="form-outline mb-4" >
                <select className="nice-select" onChange={(event) => setSexe(event.target.value)} value={sexe} name="sortby">                                                    <option value="">Gender</option>
                     <option value="Male">Male</option>
                       <option value="Female">Female</option>
                </select>
                  {errors.sexe !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.sexe} </div> : ''}

              </div>
              <div className="form-outline mb-4">
                <input type="text" id="form3Example3" className="form-control" onChange={(event) => setPhone(event.target.value)}  value={phone} />
                <label className="form-label" >Phone Number</label>
                {errors.phone !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.phone} </div> : ''}

              </div>
              <div className="form-outline mb-4">


              <select className="nice-select"  onChange={(event) => setOccupation(event.target.value)} value={occupation} name="sortby">
                         <option value="">Occupation</option>
                               <option value="Student">Student</option>
                                       <option value="Employee">Employee</option>
                                                 </select>
                                                 {errors.occupation !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.occupation} </div> : ''}

              </div>
                <br/><br/>
              <div className="form-outline mb-4 ">
                                               <input   onChange={(event) => setProfilePicture(event.target.files[0])}    type="file" accept=".png, .jpg, .jpeg" name="photo" />
                                              {errors.profilePicture !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.profilePicture} </div> : ''}

                                          </div>

             <div className="form-outline mb-4 ">
                 <br/>
                <ReCAPTCHA sitekey={SITE_KEY}
                    onChange={onChange}
                 />
                {errors.recaptcha !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.recaptcha} </div> : ''}

             </div>
              <button type="submit" className="btn btn-danger btn-block mb-4"  style={{paddingLeft:"10px"}}>
                Sign up
              </button>

              

              <div className="text-center">
                <p>or sign up with:</p>

                         <div className='d-flex justify-content-center'>
                                <GoogleButton
                                   type="light" 
                                    onClick={ signInGoogle }
                                />
                                                                                                                                                                    
                           </div>
               <div className='d-flex'>
                          <h6 className="terms-condition" style={{paddingBottom:'10px' }}><LockResetIcon /> Forget your password !? <a onClick={handleShow}>click here !</a></h6>
                </div>
                                                                       
                                                                                                                
                                                        </div>       
                                                    
            </form>
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
        </div>


      </div>
    </div>
  </div>
</section> 
</>
  )
}

export default Signup
