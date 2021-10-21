import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Shelter_More_Information = () => {

    const dt:any = {};

    let [data, setData] = useState(dt);
    let params:any = useParams();

    useEffect(()=>{
        fetch(`https://foundanimal.azurewebsites.net/api/shelters/${params['id']}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then(resp=>resp.json())
        .then(resp => {
            setData(resp);
        });
    },[])

    return (
            <div style={{width:"50%", position:"absolute", textAlign:"center", left:"30%"}}>
                <div className="card">
                    <div className="description">
                        <div>
                            <h2 style={{paddingTop:"10px", fontSize:"250%"}}> <b>{data.shelterName} </b> </h2>
                            <div className="hvrbox-zoom">
                                <img className="card-img-top" style={{height:"50%", width:"50%",}} src={data.shelterImage} alt="Card image cap"/>
                            </div>
                        </div>
                        <div className="card-body"style={{textAlign:"center"}}>

                            <h6 style={{fontSize:"130%", fontWeight:"bolder", marginTop:"5%"}}>Description</h6>
                            <div style={{textAlign:"left"}}>
                                <p className="card-text" style={{fontSize:"130%", color:"#3c403d"}}>{data.description}</p>
                            </div>
                            <h6 style={{fontSize:"130%", fontWeight:"bolder"}}>Contact the shelter</h6>
                            <div style={{marginTop:"3%"}}>
                                <div style={{textAlign:"left", color:"grey"}}>
                                    <h4 style={{fontSize:"110%", fontWeight:"bolder"}}>Address: {data.address}</h4>
                                    <h6 style={{fontSize:"110%", fontWeight:"bolder"}}>Email: {data.email}</h6>
                                    <h6 style={{fontSize:"110%", fontWeight:"bolder"}}>Phone: {data.phone}</h6>
                                </div>
                            </div>
                            <div style={{marginTop:"5%"}}>
                                <div style={{textAlign:"left", color:"#696261"}}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Shelter_More_Information;