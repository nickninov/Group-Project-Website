import React from 'react';
import { Container } from 'react-bootstrap';
// import s from './layout.css';

export const Layout = (props) => (
    // <Container className={s.container}>
    <Container>
        {props.children}
    </Container>
)

export default Layout;