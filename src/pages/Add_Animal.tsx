import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import validator from 'validator';

const Add_Animal = (props: {id:number, jwt:string}) => {


  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [redirect, setRedirect] = useState(false);


  const [shelterId, setShelterId] = useState(-1);

  const [shelters, setShelters] = useState([]);

  useEffect(()=>{
    fetch('https://foundanimal.azurewebsites.net/api/shelters/names', {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
        credentials: 'include'
    }).then(resp=>resp.json())
    .then(resp=> {setShelters(resp)})
  },[])
  
const saveAnimal = async (e:SyntheticEvent) => {
    e.preventDefault();
    
    await fetch('https://foundanimal.azurewebsites.net/api/animals', {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
        credentials: 'include',
        body: JSON.stringify ({
            title,
            address,
            description,
            userId:props.id,
            imageUrl:(validator.isURL(imageUrl)===true ? imageUrl : window.location.origin + '/images/lizard.png'),
            shelterId
        })
    });  
    setRedirect(true);
}

    if(redirect){
        return <Redirect to="/found"/>
    }

    var li:any = [];

    shelters.forEach(element => {
        li.push(<option value={element['id']}>{element['shelterName']}</option>);
    });


    return (
        <form onSubmit={saveAnimal} style={{minWidth:"15vw"}}>
            <h1 className="head" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Add animal</h1>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} maxLength={15} minLength={5} required/>
            </div>
            <div className="form-group">
                <img className="card-img-top" src={imageUrl} alt="Card image cap" style={{margin:"20px 0px 10px 0px"}} />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Address" onChange={(e)=> setAddress(e.target.value)} maxLength={100}  minLength={5} required/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" minLength={10} maxLength={8000} onChange={(e)=> setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
                <label>Shelter</label>
                <select className="form-select" onChange={(e) => setShelterId(parseInt(e.target.value))}>
                    <option value="-1">None</option>
                    {li}
                </select>
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

export default Add_Animal;

