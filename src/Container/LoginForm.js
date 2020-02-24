import React from 'react';
import { Button, FormGroup, FormControl, FormText, FormLabel, Form } from "react-bootstrap";
import envelope from '../assets/envelope.png';
import login from './Login.css';

 export default function Login(props) {


     return (
         <div className={login.Login}>
            <Form>
            <FormGroup controlId="formBasicEmail">
                <FormLabel>
                    <img src={envelope}/>
                    Email address
                </FormLabel>
                <FormControl type="email" placeholder="Enter email" />
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup controlId="formBasicCheckbox">
            </FormGroup>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
         </div> 
     );
 }