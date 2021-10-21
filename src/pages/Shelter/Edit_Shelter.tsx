import Cookies from 'js-cookie';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import validator from 'validator';

const Edit_Shelter = (props: {id:number, jwt:string}) => {


  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [redirect, setRedirect] = useState(false);

  let params:any = useParams();

  useEffect(()=>{
    fetch(`http://localhost:8000/api/shelters/${params['id']}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
        credentials: 'include'
    })
    .then(resp=>resp.json())
    .then(resp => {
        setName(resp.shelterName);
        setAddress(resp.address);
        setEmail(resp.email);
        setPhone(resp.phone);
        setDescription(resp.description);
        setImageUrl(resp.shelterImage);
    
    }).catch(e => window.location.href='/found');
},[])

const editShelter = async (e:SyntheticEvent) => {
    e.preventDefault();
    
    await fetch('https://foundanimal.azurewebsites.net/api/shelters', {
        method: "PUT",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
        credentials: 'include',
        body: JSON.stringify ({
            id:params['id'],
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
        <form onSubmit={editShelter} style={{minWidth:"15vw"}}>
            <h1 className="head" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Edit Shelter</h1>
            <div className="form-group">
                <label>Shelter name</label>
                <input type="text" className="form-control" placeholder="Shelter name" value={name} onChange={(e)=> setName(e.target.value)} maxLength={80} minLength={5} required/>
            </div>
            <div className="form-group">
                <img className="card-img-top" src={imageUrl} alt="Shelter image" style={{margin:"20px 0px 10px 0px"}} />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e)=> setAddress(e.target.value)} maxLength={100}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="shelter@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} maxLength={50}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="phone" className="form-control" placeholder="+37069074950" value={phone} onChange={(e)=> setPhone(e.target.value)} maxLength={30}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" minLength={10} maxLength={8000} value={description} onChange={(e)=> setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
                <label>Image link</label>
                <a href="https://lt-lt.imgbb.com/" target="_blank"> Host image</a>
                <input type="text" className="form-control" placeholder="https://upload/image.jpg" value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)}maxLength={5000}/>
            </div>
            <div className="input-group mb-3">
            <div style={{marginBottom:"20%"}}>
                <button type="submit" className="btn btn-primary" style={{position:"absolute", right:"0px", marginTop:"3%", zIndex:0}}>Submit</button>
            </div>
            </div>
        </form>
    );
};

export default Edit_Shelter;

