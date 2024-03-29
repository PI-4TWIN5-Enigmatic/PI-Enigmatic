import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [sector, setSector] = useState('');
    const [validator, setValidator] = useState('');
    const [foundationDate, setFoundationDate] = useState('');
    const [webSite, setWebSite] = useState('');
    const [logoPicture, setLogoPicture] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate()
    const {id} = useParams();
    const [errors, setErrors] = useState(
        {
            name:'',
            email:'',
            location:'',
            description:'',
            sector:'',
            validator:'',
            foundationDate:'',
            webSite:'',
            phone:'',
            country:'',
            logoPicture:'',

        }
    )


    const formValidation = () => {
        let etat = true ;
        let localError = {
            name:'',
            email:'',
            location:'',
            description:'',
            sector:'',
            validator:'',
            foundationDate:'',
            webSite:'',
            phone:'',
            country:'',
            logoPicture:'',

        }
        if(name === "" ){
           localError.name = " name required" ;
           etat = false;
        }
        if(email === "" ){
            localError.email = " email required" ;
            etat = false;
         }
         if(location === "" ){
            localError.location = " location required" ;
            etat = false;
         }
         if(description === "" || description.length < 30  ){
            localError.description = " description required and 30 caracters min" ;
            etat = false;
         }
         if(sector === "" ){
            localError.sector = " sector required" ;
            etat = false;
         }
         if(validator === "" ){
            localError.validator = " validator required" ;
            etat = false;
         }
         if(foundationDate === "" ){
            localError.foundationDate = " Foundation Date required" ;
            etat = false;
         }
         if(webSite === "" ){
            localError.webSite = " webSite required" ;
            etat = false;
         }
         if(phone === "" ){
            localError.phone = " phone required" ;
            etat = false;
         }
         if(country === "" ){
            localError.country = " country required" ;
            etat = false;
         }
         if(logoPicture === "" ){
            localError.logoPicture = " Logo Picture required" ;
            etat = false;
         }
       
         setErrors(localError)
        //  console.log(localError)
         return etat ; 
          

    }


    const getAssociation = async()=>{
    const response = await fetch (`http://localhost:8000/association/get/${id}` , {
    method:"GET",
    });
    
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setLocation(data.location);
        setDescription(data.description);
        setSector(data.sector);
        setValidator(data.validator);
        setFoundationDate(data.foundationDate);
        setWebSite(data.webSite);
        setPhone(data.phone);
        setCountry(data.country);
        setLogoPicture(data.logoPicture)
        console.log(data);
    };

    useEffect(()=>{
    getAssociation();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(logoPicture)
        const isFormValid = formValidation();
        if(isFormValid){
            const dataimg = new FormData()
            dataimg.append("file",logoPicture)
            dataimg.append("upload_preset","enigmatic")
            dataimg.append("cloud_name","dtisuumvj")
            console.log(dataimg)

             axios.post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",dataimg)
            .then((result) => {
                
                console.log()
                // Send a PUT request to the backend API
                axios.put(`http://localhost:8000/association/UpdateAssociation/${id}`, {
                    name,
                    email,
                    location,
                    description,
                    sector,
                    validator,
                    foundationDate,
                    webSite,
                    phone,
                    country,
                    logoPicture:result.data.secure_url
                })
                    .then(response => {
                        console.log(response);
                        navigate('/')
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
        
        if (window.confirm('Are you sure you want to deactivate your association account ?')) {
            await axios.post(`http://localhost:8000/association/deactivateAccount/${id}`)
           
                .then((response) => {
                    navigate('/signup')
                    toast.info("Association account has been deactivated")
                    
                    console.log(response) 
            }
        )}
    }
    return (
        <>
        
        <main>
                <div className="main-wrapper pb-0 mb-0">
                    <div className="timeline-wrapper">     
                        <div className="timeline-page-wrapper">
                            <div className="container-fluid p-0">
                                <div className="row no-gutters">
                                    <div className="">
                                        <div className="signup-form-wrapper">
                                            <h1 className="create-acc text-center">Update An association account </h1>
                                            <div className="signup-inner text-center">
                                                <h3 className="title">GiveBack</h3>
                                                <form className="signup-inner--form">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <img src ={logoPicture}></img>
                                                                 <br></br><br></br><br></br><br></br>
                                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="single-field" placeholder="Email"/>
                                                            {errors.email !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.email} </div> : ''}

                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="single-field" placeholder="Name"/>
                                                            {errors.name !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.name} </div> : ''}

                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}  className="single-field" placeholder="Country"/>
                                                            {errors.country !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.country} </div> : ''}

                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}  className="single-field" placeholder="Location"/>
                                                            {errors.location !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.location} </div> : ''}

                                                        </div>
                                                        <div className="col-12">
                                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}  className="single-field" placeholder="description"/>
                                                            {errors.description !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.description} </div> : ''}

                                                        </div>
                                                        <div className="col-12">
                                                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}  className="single-field" placeholder="phone number"/>
                                                            {errors.phone !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.phone} </div> : ''}

                                                        </div>
                                                        <div className="col-md-12">
                                                            <select className="nice-select" onChange={(e) => setSector(e.target.value)} value={sector} name="sortby">
                                                                <option value="">Sector</option>
                                                                <option value="Health">Health</option>
                                                                <option value="Nature">Nature</option>
                                                                <option value="Education">Education</option>
                                                                <option value="Poverty">Poverty</option>
                                                            </select>
                                                            {errors.sector !== "" ? <div style={{textAlign:'left' , paddingBottom:'10px'  , color: 'rgb(220,71,52)'}} >{errors.sector} </div> : ''}

                                                        </div>
                                                        <div className="col-md-6">
                                                          <input type="text" value={validator} onChange={(e) => setValidator(e.target.value)} className="single-field" placeholder="Validator"/>
                                                          {errors.validator !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.validator} </div> : ''}

                                                        </div>
                                                        <div className="col-md-12">
                                                          <input type="date"  value={foundationDate} onChange={(e) => setFoundationDate(e.target.value)}  className="single-field" placeholder="foundationDate"/>
                                                          {errors.foundationDate !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.foundationDate} </div> : ''}

                                                        </div>
                                                        <div className="col-12">
                                                            <input type="text" value={webSite} onChange={(e) => setWebSite(e.target.value)}  className="single-field" placeholder="WebSite"/>
                                                            {errors.webSite !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.webSite} </div> : ''}

                                                        </div>
                                                        <div className="col-12">
                                                            <input type="file"  onChange={(e) => setLogoPicture(e.target.files[0])} className="single-field" placeholder="logoPicture"/>
                                                            {errors.logoPicture !== " " ? <div style={{textAlign:'left' , paddingBottom:'10px', color: 'rgb(220,71,52)'}} >{errors.logoPicture} </div> : ''}

                                                        </div>
                                                        
                                                        <div className="col-12">
                                                            <button  onClick={handleSubmit} className="submit-btn">Update association</button>
                                                        </div>
                                                    </div>
                                                        <h6 className="terms-condition">Deactivate Association Account ? <a onClick={handleDeactivate} className="link-danger">click here</a></h6>
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
        



export default Update
