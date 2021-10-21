import { SyntheticEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Footer from '../components/Footer';

const Found_Animal = (props: {id:number, role:any, jwt:string}) => {

    let [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [animalId, setAnimalId] = useState('');

    const [shelters, setShelters] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(()=>{
        fetch('https://foundanimal.azurewebsites.net/api/animals', {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        }).then(resp=>resp.json())
        .then(resp=> {setData(resp)})

        fetch('https://foundanimal.azurewebsites.net/api/shelters/names', {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        }).then(resp=>resp.json())
        .then(resp=> {setShelters(resp)})
    },[]) 

    const deleteAnimal = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch(`https://foundanimal.azurewebsites.net/api/animals/${animalId}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
          credentials: 'include'
      });
      
      window.location.href='/found';
    }

    async function filtrate (filtrate:string) {
        
        const response = fetch(`https://foundanimal.azurewebsites.net/api/animals${filtrate}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
        })

        const content = await response;
        setStatus(content.status);
        if(content.status != 404){
            setData(await content.json())
        }else {
            setData([]);
        }     
    }
    

    const filtrateBy = async (value:string, e:SyntheticEvent) => {
        e.preventDefault();

        if(value == '-1'){
            await filtrate('');
        }
        else if(value == '-2'){
            await filtrate('/byuser');
        }
        else if(value == '-3'){
            await filtrate('/athome');
        }
        else{
            const fnc = async() => {
                    e.preventDefault();
                const response = fetch(`https://foundanimal.azurewebsites.net/api/animals/${parseInt(value)}/byshelter`, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
                    credentials: 'include'
                })
                const content = await response;
                setStatus(content.status);
                if(content.status != 404){
                    setData(await content.json())
                }else {
                    setData([]);
                }
            };
            fnc();
        }
    }
  
    var list:any = [];

    if(status != 404){
        
        data.forEach((element) => {

            var t = JSON.stringify(element['description']).substring(0,102).substring(1).slice(0,-1);
            let controls;
            if((props.id === element['userId']) || props.role == '2'){
                controls = (
                    <div className="edit opp">
                        <a href={`/edit/animal/${element['id']}`} className="opp"> <img src={window.location.origin + '/images/icons/edit-solid.svg'} style={{width:"8%", height:"8%", position:"absolute", marginLeft:"0.6vw", marginTop:"0.3vw", opacity:"1"}} alt="" /></a>
                        <a href="javascript:void(0);" onClick={(e) => {setModalIsOpen(true); setAnimalId(element['id'])}}> <img className="" src={window.location.origin + '/images/icons/trash-alt-solid.svg'} style={{width:"7%", height:"7%", position:"absolute", right:"1vw", marginTop:"0.6vw", opacity:"1"}} alt=""/></a>
                    </div>
                )
            }

            list.push(
                <div className="card op">
                    {controls}
                    <img className="op" src={element['imageUrl'] ? element['imageUrl'] : window.location.origin + '/images/lizard.png'} style={{width:"100%", height:"65%"}} alt="" />
                    <div className="card-body">
                        <div className="edit">
                            <h5 className="card-title small">{element['title']}</h5>
                        </div>
                        <p className="card-text">{t}</p>
                    </div>
                    <a href={`/more/animal/${element['id']}`} className="btn btn-primary">More information</a>
                </div>
            );
        });
    }

    let add:any;
    let opt:any;

    if(props.role == '1' || props.role == '2'){
        add = (
            <a href="/add" className="btn btn-primary" style={{background:"#1A936F", position:"relative", left:"8em"}}> Add animal</a>
        );
        opt = (
            <option value="-2">My added</option>
        );
    }

    var li:any = [];

    shelters.forEach(element => {
        li.push(<option value={element['id']}>{element['shelterName']}</option>);
    });

    return (
        <div>
            <h1 className="head" style={{fontFamily:"Georgia", textAlign:"center", paddingBottom:"10px"}}>Found animal</h1>
            <div className="flt">
                <div>
                    {add}
                </div>
                <div className="fltt">
                    <div>
                        <label style={{fontSize:"110%"}}>Filtration by: </label>
                    </div>
                    <div>
                        <select className="form-select" onChange={(e) => filtrateBy(e.currentTarget.value, e)} style={{marginBottom:"1em", width:"80%"}}>
                            <option value="-1">All animals</option>
                            {opt}
                            {li}
                            <option value="-3">At people home</option>
                        </select>
                    </div>          
                </div>
            </div>
            <div className="wrapper-cards">
                {list}
            </div>
            <Modal isOpen={modalIsOpen} className="Modal" onRequestClose={() => setModalIsOpen(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete animal</h5>
                        <button type="button" style={{background:"#ffffff", border:"none", fontSize:"160%"}} onClick={() => setModalIsOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body md">
                        Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalIsOpen(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => {setModalIsOpen(false); deleteAnimal(e)}}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Found_Animal;