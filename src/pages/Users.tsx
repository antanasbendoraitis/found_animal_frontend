import {SyntheticEvent, useEffect, useState} from "react";
import Modal from 'react-modal';

const Users = (props: {jwt:string}) => {

    let [data, setData] = useState([]);
    let [roles, setRoles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    let [deleteId, setDeleteId] = useState(false);

    const changeRole = async (id:any, rolee:any, index:any, e:SyntheticEvent) => {
        e.preventDefault();
        const role = parseInt(rolee);
        await fetch(`https://foundanimal.azurewebsites.net/api/roles/${id}`, {
          method: "PATCH",
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
          credentials: 'include',
          body: JSON.stringify ({
             role
          })
      });
      window.location.href="/users";
    }

    useEffect(()=>{
        fetch('https://foundanimal.azurewebsites.net/api', {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        }).then(resp=>resp.json())
        .then(resp=> {setData(resp)})

        fetch('https://foundanimal.azurewebsites.net/api/roles', {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        }).then(resp=>resp.json())
        .then(resp=> {setRoles(resp)})
    },[])

    const deleteUser = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch(`https://foundanimal.azurewebsites.net/api/${deleteId}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
          credentials: 'include'
        });

      window.location.href='/users';
    }

    var li:any = [];

    roles.forEach(element => {
        li.push(<option value={element['id']}>{element['role']}</option>);
    });

    var list:any = [];

    data.forEach((element, index) => {
        list.push(                
        <tr>
            <th scope="row">{element['id']}</th>
            <td>{element['username']}</td>
            <td>{element['email']}</td>
            <td style={{width:"13%"}}>
                <select className="form-select" value={element['role']}  onChange={(e) => changeRole(element['id'], e.currentTarget.value, index, e)}>
                    {li}
                </select>
            </td>
            <td style={{width:"13%"}}>
                <a href="javascript:void(0);" style={{color:"var(--bs-table-bg)"}} onClick={() => {setModalIsOpen(true); setDeleteId(element['id'])}}> <img className="icc" src={window.location.origin + '/images/icons/trash-alt-solid.svg'} alt=""/></a>
            </td>
        </tr>);
    });
 

    return (
        <div className="container" style={{textAlign:"center"}}>
        <h1 className="ah" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Users</h1>
        <div className="row">
            <div className="col-12">
            <table className="table table-bordered users" id="users">
                <thead>
                <tr style={{background:"#42b947"}}>
                    <th scope="col">Id</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
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
                    <h5 className="modal-title">Delete user</h5>
                    <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalIsOpen(false)}>
                        &times;
                    </button>
                </div>
                <div className="modal-body md">
                    Are you sure?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalIsOpen(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={(e) => {setModalIsOpen(false); deleteUser(e)}}>Delete</button>
                </div>
            </div>
        </Modal>
        </div>
    );
};

export default Users;


