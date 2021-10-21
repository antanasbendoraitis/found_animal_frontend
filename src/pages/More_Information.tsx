import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

const More_information = (props: {id:number, role:any, jwt:string}) => {

    const dt:any = {};

    let [data, setData] = useState(dt);
    let [dataComment, setDataComment] = useState([]);
    let params:any = useParams();
    let [comment, setComment] = useState('');


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [commentId, setCommentId] = useState(false);
    const [status, setStatus] = useState(0);

    useEffect(()=>{
        fetch(`https://foundanimal.azurewebsites.net/api/animals/${params['id']}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        })
        .then(resp=>resp.json())
        .then(resp => {
            setData(resp);
        })

         setInterval ( async () =>{
            const response =  fetch(`https://foundanimal.azurewebsites.net/api/comments/${params['id']}`, {
                method: "GET",
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
                credentials: 'include'
            })
            
            const content = await response;
            setStatus(content.status);
            if(content.status != 404)
            {
                setDataComment(await content.json())
            }else {
                setDataComment([]);
            }
        }, 1000)
    },[])

    var list:any = [];
    console.log(dataComment);
    
    if(status != 404){
        dataComment.forEach((element) => {
            let change:any;
            if(props.role == '2'){
                change = (
                    <>
                        <a href="javascript:void(0);" style={{position:"absolute", right:"0px", width:"5%", height:"5%", marginRight:"12%"}} onClick={()=> {setModalEdit(true); setComment(element['comment']); setCommentId(element['id'])}}> <img src={window.location.origin + '/images/icons/edit-solid.svg'} style={{width:"280%", height:"280%"}} alt="" /></a>

                        <a href="javascript:void(0);" style={{position:"absolute", right:"5%", width:"5%", height:"5%"}} onClick={()=> {setModalIsOpen2(true); setCommentId(element['id'])}}> <img src={window.location.origin + '/images/icons/trash-alt-solid.svg'} style={{width:"280%", height:"280%"}} alt=""/></a>
                    </>
                );
            }
            list.push(                
                    <div className="card" style={{marginTop:"1%", marginBottom:"3%"}}>
                        <div className="description">
                            <div className="card-body">
                                {change}
                                <h1 style={{fontSize:"125%", paddingTop:"10px", marginLeft:"2%", color:"#992820", fontStyle:"italic"}}>{element['user']}</h1>
                                <h4 style={{fontSize:"75%", color:"red", marginLeft:"2%"}}>{element['date']}</h4>
                                <p className="card-text" style={{fontSize:"110%", color:"#3c403d"}}>{element['comment']}</p>
                            </div>
                        </div>
                    </div>);
        });
    }

    const saveComment = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch('https://foundanimal.azurewebsites.net/api/comments', {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include',
            body: JSON.stringify ({
                animalId:params['id'],
                comment
            })
        });
        setModalIsOpen(false)
    }

    let cm:any;

    if(props.role == '0' || props.role == '1' || props.role == '2'){
        cm = (
            <div style={{marginBottom:"10%"}}>
                <button className="btn btn-primary" style={{position:"absolute", right:"10%", opacity:"0.8"}} onClick={() => setModalIsOpen(true)}> Add comment</button>
            </div>
        );
    }

    const deleteComment = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch(`https://foundanimal.azurewebsites.net/api/comments/${commentId}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
          credentials: 'include'
      });

      setModalIsOpen2(false);
    }

    const editComment = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch(`https://foundanimal.azurewebsites.net/api/comments/${commentId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include',
            body: JSON.stringify ({
                comment
            })
        });
        setModalEdit(false)
    }

    return (
        <div style={{width:"250%", position:"relative", right:"55%"}}>
            <div className="card">
                <div className="description">
                    <div style={{textAlign:"center"}}>
                        <h1 style={{fontSize:"180%", paddingTop:"10px"}}>{data.title} </h1>
                        <div className="hvrbox-zoom">
                            <img className="card-img-top" style={{height:"50%", width:"50%",}} src={data.imageUrl} alt="Card image cap"/>
                        </div>
                    </div>
                    <div className="card-body">
                        <h4 style={{fontSize:"130%", fontWeight:"bolder"}}>{data.address}</h4>
                        <p className="card-text" style={{fontSize:"130%", color:"#3c403d"}}>{data.description}</p>
                    </div>
                </div>
            </div>
            <div style={{marginLeft:"6%"}}>
                <h5 className="head" style={{fontSize:"130%", fontFamily:"Georgia", marginTop:"5%"}}>Comments</h5>
                {list}
            </div>
            {cm}
            <Modal isOpen={modalIsOpen} className="Modal" onRequestClose={() => setModalIsOpen(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Write comment</h5>
                        <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalIsOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <form onSubmit={saveComment}>
                        <div className="modal-body md">
                            <label className="col-form-label">Comment:</label>
                            <div className="form-group">
                                <textarea className="form-control" minLength={4} maxLength={500} onChange={(e)=> setComment(e.target.value)} required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalIsOpen(false)}>Close</button>
                            <button type="submit" className="btn btn-primary">Comemnt</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={modalIsOpen2} className="Modal" onRequestClose={() => setModalIsOpen2(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete comment</h5>
                        <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalIsOpen2(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-header">
                        Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalIsOpen2(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={deleteComment}>Delete</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={modalEdit} className="Modal" onRequestClose={() => setModalEdit(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit comment</h5>
                        <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalEdit(false)}>
                            &times;
                        </button>
                    </div>
                    <form onSubmit={editComment}>
                        <div className="modal-body md">
                            <label className="col-form-label">Comment:</label>
                            <div className="form-group">
                                <textarea className="form-control" minLength={4} maxLength={500} value={comment} onChange={(e)=> setComment(e.target.value)} required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalEdit(false)}>Close</button>
                            <button type="submit" className="btn btn-primary">Comemnt</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default More_information;