import Cookies from 'js-cookie';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';
import validator from 'validator';

const Add_Shelter = (props: {id:number, jwt:string}) => {


  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [redirect, setRedirect] = useState(false);

const saveShelter = async (e:SyntheticEvent) => {
    e.preventDefault();
    
    await fetch('https://foundanimal.azurewebsites.net/api/shelters', {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
        credentials: 'include',
        body: JSON.stringify ({
            shelterName:name,
            address,
            email,
            phone,
            description,
            ShelterImage:(validator.isURL(imageUrl)===true ? imageUrl : window.location.origin + '/images/lizard.png')
        })
    })
    setRedirect(true);
}

if(redirect){
    return <Redirect to="/shelters"/>
}

    return (
        <form onSubmit={saveShelter} style={{minWidth:"15vw"}}>
            <h1 className="head" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Add Shelter</h1>
            <div className="form-group">
                <label>Shelter name</label>
                <input type="text" className="form-control" placeholder="Shelter name" onChange={(e)=> setName(e.target.value)} maxLength={80} minLength={5} required/>
            </div>
            <div className="form-group">
                <img className="card-img-top" src={imageUrl} alt="Shelter image" style={{margin:"20px 0px 10px 0px"}} />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Address" onChange={(e)=> setAddress(e.target.value)} maxLength={100}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="shelter@example.com" onChange={(e)=> setEmail(e.target.value)} maxLength={50}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="phone" className="form-control" placeholder="+37069074950" onChange={(e)=> setPhone(e.target.value)} maxLength={30}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" minLength={10} maxLength={8000} onChange={(e)=> setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
                <label>Image link</label>
                <a href="https://lt-lt.imgbb.com/" target="_blank"> Host image</a>
                <input type="text" className="form-control" placeholder="https://upload/image.jpg" onChange={(e)=> setImageUrl(e.target.value)}maxLength={5000}/>
            </div>
            <div className="input-group mb-3">
            <div style={{marginBottom:"20%"}}>
                <button type="submit" className="btn btn-primary" style={{position:"absolute", right:"0px", marginTop:"3%", zIndex:0}}>Submit</button>
            </div>
            </div>
        </form>
    );
};

export default Add_Shelter;

