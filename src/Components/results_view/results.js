import React from 'react';

import { Container, Row } from 'react-bootstrap';

import { ResultsItem } from './results_item';

export const Results = () => {

	/**
	 * data that must be shown on screen should be input as the prop to this function
	 * ... then replace the require statement with the passed in prop data
	 */
	const resultsItem = require('../../API/MOCK_DATA.json').map(item => <ResultsItem item={item} />)

	return (
		<Container style={{ marginTop: 30 }}>
			<Row>
				{resultsItem}
			</Row>
		</Container>
	)
}
