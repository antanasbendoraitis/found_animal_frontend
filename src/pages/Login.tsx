import { SyntheticEvent, useState } from 'react';

const Login = (props: {username:string, setName: (username:string) => void}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [httpStatusCode, setHttpStatusCode] = useState(Number);

  const submit = async (e:SyntheticEvent) => {
      e.preventDefault();
      const response = await fetch('https://foundanimal.azurewebsites.net/api/login', {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Accept-Encoding':'keep-alive'},
        credentials: 'include',
        body: JSON.stringify ({
            email,
            password
        })
    });
    const content = await response.json();
    setHttpStatusCode(400);
    if(response.ok){
      props.setName(content.username);
      window.location.replace('/');
    }
  }

  let rt;

  if(httpStatusCode === 400){
      rt = (
          <label style={{color:"red"}}>*Wrong email or password</label>
      );
  }

    return (
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          {rt}
            <input type="email" className="form-control" placeholder="name@example.com" required
              onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" maxLength={250} required
              onChange={e => setPassword(e.target.value)}
            />

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;