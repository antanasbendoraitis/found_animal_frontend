import { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';

const Register = () => {

    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [httpStatusCode, setHttpStatusCode] = useState(Number);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetch('https://foundanimal.azurewebsites.net/api', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ({
                username,
                email,
                password
            })
        }).then(resp => setHttpStatusCode(resp.status))
    }

    let rt;

    if(httpStatusCode === 409){
        rt = (
            <label style={{color:"red"}}>*Email already exists</label>
        );
    }else if (httpStatusCode == 201) {
        return <Redirect to="/login"/>
    }

    return (
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input type="text" className="form-control" placeholder="Name" required
                onChange={e => setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e => setEmail(e.target.value)}
            />
            {rt}

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

          <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;