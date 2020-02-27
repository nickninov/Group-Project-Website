import React from 'react';
import { Container } from 'react-bootstrap';
import s from './Layout.css';

export const Layout = (props) => (
    <Container className={s.container}>
        {props.children}
    </Container>
)