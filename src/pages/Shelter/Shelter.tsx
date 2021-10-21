import Cookies from "js-cookie";
import {SyntheticEvent, useEffect, useState} from "react";
import Modal from 'react-modal';

const Shelter = (props: {role:any, jwt:string}) => {

    let [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [shelterId, setShelterId] = useState('');

    useEffect(()=>{
        fetch('https://foundanimal.azurewebsites.net/api/shelters', {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        }).then(resp=>resp.json())
        .then(resp=> {setData(resp)})
    },[])

    const deleteShelter = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch(`https://foundanimal.azurewebsites.net/api/shelters/${shelterId}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
          credentials: 'include'
      });
      window.location.href='/shelters';
    }

    var list:any = [];

    data.forEach((element, index) => {
        let change:any;
        if(props.role == '2'){
            change = (
                <>
                    <a href={`edit/shelter/${element['id']}`} style={{color:"var(--bs-table-bg)"}}> <img className="icc" src={window.location.origin + '/images/icons/edit-solid.svg'} style={{marginRight:"6%"}} alt="" /></a>
                    <a href="#" onClick={() => {setModalIsOpen(true); setShelterId(element['id'])}} style={{color:"var(--bs-table-bg)"}}> <img className="icc" src={window.location.origin + '/images/icons/trash-alt-solid.svg'} alt=""/></a>
                </>
            );
        }
        list.push(                
        <tr>
            <th scope="row">{element['id']}</th>
            <td>{element['shelterName']}</td>
            <td>{element['address']}</td>
            <td>{element['email']}</td>
            <td style={{width:"20%"}}>
                <a href={`more/shelter/${element['id']}`}> <img className="icc" src={window.location.origin + '/images/icons/info-solid.svg'} style={{marginRight:"6%"}} alt=""/></a>
                {change}
            </td>
        </tr>);
    });

    let add:any;

    if (props.role == '2') {
        add = (
            <a href="/create/shelter" className="btn btn-primary" style={{background:"#1A936F", marginBottom:"1em"}}> Add Shelter</a>
        );
    }
 

    return (
        
        <div className="container" >
            <h1 className="ah" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Shelters</h1>
            {add}
            <div className="row" style={{textAlign:"center"}}>
                <div className="col-12">
                <table className="table table-bordered users" id="users">
                    <thead>
                    <tr style={{background:"#42b947"}}>
                        <th scope="col">Id</th>
                        <th scope="col">Shelter</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list}                
                    </tbody>
                </table>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} className="Modal" onRequestClose={() => setModalIsOpen(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete shelter</h5>
                        <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalIsOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body md">
                        Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalIsOpen(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {setModalIsOpen(false); deleteShelter(e)}}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Shelter;


