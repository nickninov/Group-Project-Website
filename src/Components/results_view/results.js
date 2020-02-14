import React from 'react';

import ResultsItem from './results_item';

import { Grid, Row } from 'react-flexbox-grid';



export const Results = () => (
	<div style={{ padding: 50 }}>
		<div style={{
			// display: 'flex', flexDirection: 'row', alignItems: 'center',
			marginBottom: 20
		}}>
			<form>
				<input style={{ fontSize: 28, border: 0, backgroundColor: '#F5F5F5', padding: 10, width: '100%', fontWeight: '600' }} placeholder="Search" />
			</form>
		</div>
		<div style={{
			display: 'flex',
			flexDirection: 'row',
		}}>
			<div style={{ width: '20%', marginRight: 20 }}>
				<img src="https://docs.madrasthemes.com/wp-content/uploads/sites/2/2017/10/product-filter-widget.png" style={{ width: '100%', height: undefined, aspectRatio: 1 }} />
			</div>
			<div style={{ width: '80%' }}>
				<Grid fluid>
					<Row between="xs" style={{}} >
						{
							require('../../API/MOCK_DATA.json').map(x => (
								<ResultsItem item={x} />
							))
						}
					</Row>
				</Grid>
			</div>
		</div>
	</div>
)