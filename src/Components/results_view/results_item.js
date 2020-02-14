
import React from 'react';

import { Col } from 'react-flexbox-grid';
import * as Icon from 'react-feather';
import LinesEllipsis from 'react-lines-ellipsis';

import { Grid, Row } from 'react-flexbox-grid';

export default function ResultsItem(props) {
    const item = props.item;

    return (
        <Col style={{}} xs={6} md={3}>
            <div style={{ marginBottom: 20, maxWidth: 1, maxWidth: '100%' }}>
                <img src={item.image} style={{ width: '100%', height: undefined, aspectRatio: 1 }} />

                <LinesEllipsis
                    style={{ padding: 0, marginBottom: 5, marginTop: 5 }}
                    text={item.name}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />

                <span style={{ fontWeight: 700 }}>£{item.price}</span>

                {
                    (Math.floor(Math.random() * 3) + 1) == 3 ?
                        <span>
                            <span style={{fontSize: 12}}>  £<span style={{ textDecoration: 'line-through' }}>{(item.price * 1.1).toFixed(2)}</span></span>
                        </span> : <div />
                }

                <div style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: "space-between", marginTop: 10
                }}>
                    <div style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: "flex-start", padding: 5, paddingLeft: 0, paddingBottom: 4, borderRadius: 5
                    }}>
                        <Icon.Bookmark style={{ marginRight: 10 }} size="18" color="#A72D2D" />
                        <Icon.Share size="18" color="#A72D2D" />
                    </div>


                    <div style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: "center", backgroundColor: '#EAEFD3', padding: 5, paddingBottom: 4, borderRadius: 5
                    }}>
                        <Icon.ShoppingCart size="18" color="#A72D2D" />
                        <span style={{ marginLeft: 6, fontSize: 12, color: "#A72D2D", fontWeight: 600 }}>Add to Cart</span>
                    </div>
                </div>

            </div>
        </Col>
    )

}