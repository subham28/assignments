import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../css/Login.css";

export default function AdminLogin(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.password.value;
        var obj = {
          email:email,
          pass:pass
        }
        console.log(obj);
        fetch("http://localhost:4000/auth/validate",{
            method: "POST",
            credentials: "include",
            body:JSON.stringify(obj),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
    }
    return (
        <div className="Login">
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <label>Email</label>
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <label>Password</label>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
      );
}