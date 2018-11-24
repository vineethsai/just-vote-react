import React, { Component } from 'react';
import { Container, InputGroupAddon, Table, Button, Form, Input, Row, Col, InputGroupText } from 'reactstrap';

class Result extends Component {
    render() {
        return(
            <div>
                <h3>{this.props.opportunity.AgencyName}</h3>
                <p>{this.props.opportunity.WhatWeDo}</p>
                <address>{this.props.opportunity.Address}<br />
                    <a href='tel:'{this.props.opportunity.AgencyPhone}>{this.props.opportunity.AgencyPhone}</a><br />
                    <a href={this.props.opportunity.AgencyUrl}>Website</a>
                </address>
            </div>
        )
    }
}

export default Result;