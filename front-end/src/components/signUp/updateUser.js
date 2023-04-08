import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar'
import { Cookies, useCookies } from 'react-cookie';
import { useGetUserID } from '../../hooks/useGetUserID'
import About from '../profilePage/About';



function UpdateUser() {
    const idd = useGetUserID();

    const [cookies, _]=useCookies(['access_token'])
     const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [sexe, setSexe] = useState('');
    const navigate = useNavigate()
    const { id } = useParams();
    

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
         
         if(profilePicture === "" ){
            localError.profilePicture = " ProfilePicture required " ;
            etat = false;

         }
        

         setErrors(localError)
        //  console.log(localError)
         return etat ; 
          

    }
    

    const getUser = async()=>{
    const response = await fetch (`http://localhost:8000/api/getuser/${id}` , {
    method:"GET",
    });
    
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phone);
        setEmail(data.email);
        setOccupation(data.occupation);
        setProfilePicture(data.profilePicture);
        setSexe(data.sexe);
        setPassword(data.password)
        console.log(data);
    };

    useEffect(()=>{
    getUser();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(profilePicture)
        const isFormValid = formValidation();
        if(isFormValid){
            const dataimg = new FormData()
            dataimg.append("file",profilePicture)
            dataimg.append("upload_preset","enigmatic")
            dataimg.append("cloud_name","dtisuumvj")
            console.log(dataimg)

             axios.post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",dataimg)
            .then((result) => {
                
                console.log()
                // Send a PUT request to the backend API
                axios.put(`http://localhost:8000/api/UpdateUser/${id}`, {
                   firstName,
                    lastName,
                    phone,
                    email,
                    occupation,
                    
                    sexe,
                    profilePicture:result.data.secure_url
                },{headers:{Authorization:cookies.access_token}}
                )
                    .then(response => {
                        console.log(response);
                        navigate(`/profile/${id}`)
                        // Handle success response
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle error response
                    });
            })

            // Send form data to server or update parent component state
        //console.log(name, email, location, description, sector, validator, foundationDate, webSite, logoPicture, phone,country);
         // Create a new object to send to the server
       
    }else{
        console.log("form invalid")
    }
    
    };

    async function handleDeactivate () {
        
        if (window.confirm('Are you sure you want to deactivate your account ?')) {
            await axios.post(`http://localhost:8000/api/deactivateAccount/${id}`)
           
                .then((response) => {
                    navigate('/signup')
                    toast.info("User account has been deactivated")
                    
                    console.log(response) 
            }
        )}
    }
    
    return (
        <>
            <Navbar />
        <main>
                <div className="main-wrapper pb-0 mb-0">
                    <div className="timeline-wrapper">
                       
                        <div className="timeline-page-wrapper">
                            <div className="container-fluid p-0">
                                <div className="row no-gutters">
                                    <div className="">
                                        <div className="signup-form-wrapper">
                                            <h1 className="create-acc text-center">Update your account </h1>
                                            <div className="signup-inner text-center">
                                                <h3 className="title">GiveBack</h3>
                                                <form className="signup-inner--form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <img src ={profilePicture}></img>
                                                    <br></br><br></br><br></br><br></br>
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
                                                    <button  onClick={handleSubmit} className="submit-btn">Update Account</button>
                                                        </div>
                                                        <h6 className="terms-condition">Deactivate Account ? <a onClick={handleDeactivate} className="link-danger">click here</a></h6>
                                            </div>
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
          
            
        </>
        
            );
}
        



export default UpdateUser
