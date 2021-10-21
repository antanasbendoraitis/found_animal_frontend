import { Link } from 'react-router-dom';

 const Nav = (props: {username:string, setName: (username:string) => void, role:string, setRole: (setRole:string) => void, setId: (id:number) => void, jwt:string, setJWT: (jwt:string) => void}) => { 
    const logout = async () => {
        await fetch('https://foundanimal.azurewebsites.net/api/logout', {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.jwt},
            credentials: 'include'
         });
         props.setName(' ');
         props.setId(-1);
         props.setRole('-1');
         props.setJWT('');
         
         //window.location.reload();
    }
    
    let menu;
    if(props.username === ' '){
        console.log(props.username);
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                </li>
            </ul>
        )
    }else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                <Link to="/login" className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
                </li>
          </ul>
        )
    }
    let users:any;
    if(props.role == '2'){
        users = (
            <Link to="/users" className="navbar-brand" style={{fontSize:"125%"}}>Users</Link>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid" style={{fontSize:"125%"}}>
            <div>
                <Link to="/" className="navbar-brand" style={{fontSize:"125%"}}>Home</Link>
                <Link to="/found" className="navbar-brand" style={{fontSize:"125%"}}>Animals</Link>
                <Link to="/shelters" className="navbar-brand" style={{fontSize:"125%"}}>Shelters</Link>
                {users}
          </div>
          <div>
            {menu}
          </div>
        </div>
      </nav>
    );
};

export default Nav;