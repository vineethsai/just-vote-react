import React, { Component } from 'react';
import { Container, Button, Form, Input, Row, Col } from 'reactstrap';
//import Result from './Components/Result';
import * as d3 from "d3";

class Volunteer extends Component {
    constructor() {
        super();
        this.state = {
            allOps: '',
            results: '',
            searchTerm: '',
            displayOrder: true
        };
    }

    componentDidMount() {
        d3.csv('https://data.bloomington.in.gov/datastore/dump/d4aa517d-3d2a-46f6-93b5-6d43345e9bf5?bom=True')
            .then((op) => {
                this.setState(
                    {results: op,
                    allOps: op}
                    );
            })
            .catch((err) => {
                console.error(err);
            })
    }

    handleChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({searchTerm: value});
    }

    handleSearch = (event) => {
        event.preventDefault();
        this.loadData();
        let searchResults = this.state.results.filter((opportunity) => {
            if (opportunity.AgencyName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) >= 0) {
                return true;
            } else if (opportunity.WhatWeDo.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({results: searchResults});
    }

    changeOrder = () => {
        if (this.state.displayOrder) {
            this.state.results.sort((a, b) => {
                if (a.AgencyName < b.AgencyName) { return -1 }
                else if (a.AgencyName > b.AgencyName) { return 1 }
                else { return 0 }
            });
        } else {
            this.state.results.sort((a, b) => {
                if (a.AgencyName < b.AgencyName) { return 1 }
                else if (a.AgencyName > b.AgencyName) { return -1 }
                else { return 0 }
            });
        }
    }

    handleAscending = (event) => {
        event.preventDefault();
        this.setState({displayOrder: true});
    }

    handleDescending = (event) => {
        event.preventDefault();
        this.setState({displayOrder: false});
    }

    handleAll = (event) => {
        event.preventDefault();
        this.loadData();
    }

    render() {
        console.log(this.state.results);
        return(
            <div className='text-center'>
                <h1>Just Volunteer</h1>
                <br />
                <br />
                <h2>Enter keywords to find volunteer opportunities that might interest you:</h2>
                <Container fluid>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Form>
                                <Input aria-label='Search' type='text' onChange={this.handleChange} />
                                <Button  addonType="append" type="submit" className="btn btn-info"  onClick={this.handleSearch}>Search</Button>
                                <Button type="sort" className="btn btn-info" onClick={this.handleAscending}>Sort Ascending</Button>
                                <Button type="sort" className="btn btn-info" onClick={this.handleDescending}>Sort Descending</Button>
                                <Button className="btn btn-info" onClick={this.handleAll}>Show All</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <br />
                {this.state.results.forEach((opportunity) => {return <Result opportunity={opportunity} />})}
            </div>
        )
    }
}

class Result extends Component {
    render() {
        return(
            <div>
                <h3>{this.props.opportunity.AgencyName}</h3>
                <p>{this.props.opportunity.WhatWeDo}</p>
                <address>{this.props.opportunity.Address}<br />
                    <a href={this.props.opportunity.AgencyUrl}>Website</a>
                </address>
            </div>
        )
    }
}

export default Volunteer;