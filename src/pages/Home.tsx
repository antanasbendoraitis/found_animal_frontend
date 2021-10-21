
const Home = (props: {username:string}) => {

    return (
        <div style={{fontSize:"140%", textAlign:"center", width:"110%"}}>
            {props.username !== ' ' ? 'Hi ' + props.username : <h6 className="head" style={{fontFamily:"Georgia", paddingBottom:"10px", fontSize:"130%"}}>Found animal application</h6>}
        </div>
    );
};

export default Home;