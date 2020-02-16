import React from 'react';

import { Container, Col, Row, ButtonGroup, Button } from 'react-bootstrap';

import { AddToCart } from '../common/add_to_cart';

export const Product = () => {

	const item = require('../../API/MOCK_DATA.json')[0];

	return (
		<Container>
			<Row>
				<Col style={{
					// backgroundColor: 'lightgreen',
					padding: 60,
					display: 'flex',
					flexDirection: 'column',
				}} xs={12} md={6} lg={5}>

					<img style={{
						width: '100%',
					}} src="https://via.placeholder.com/350" alt="Product" />

					<div style={{
						display: 'flex',
						width: '10%',
						justifyContent: 'centre',
						alignItems: 'centre',
						flexDirection: 'column',
						marginTop: '20px'

					}}>
						<ButtonGroup aria-label="Basic example">
							<Button variant="secondary">1</Button>
							<Button variant="secondary">2</Button>
							<Button variant="secondary">3</Button>
						</ButtonGroup>
					</div>

				</Col>
				<Col style={{
					backgroundColor: 'lightblue',
					padding: 50
				}} xs={12} md={6} lg={7}>

					<h1>{item.name}</h1>

					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

					<AddToCart />

				</Col>
			</Row>
			<Row style={{ backgroundColor: 'lightyellow' }}>
				<Col>
					<h1>Similar</h1>
				</Col>
			</Row>
			<Row style={{ backgroundColor: 'lightgrey' }}>
				<Col>
					<h1>Specification / description</h1>
				</Col>
			</Row>
		</Container>
	)
}
