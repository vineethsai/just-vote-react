import React, { Component } from 'react';
import { Container, Button, Form, Input, Row, Col } from 'reactstrap';
import * as d3 from "d3";

// Renders search bar & list of volunteer opportunities.
class Volunteer extends Component {
    constructor() {
        super();
        this.state = {
            allOps: [],
            results: [],
            searchTerm: '',
            displayOrder: true
        };
    }

    // Loads data into application
    componentDidMount() {
        d3.csv('https://data.bloomington.in.gov/datastore/dump/d4aa517d-3d2a-46f6-93b5-6d43345e9bf5?bom=True')
            .then((op) => {
                this.setState(
                    {
                        results: op,
                        allOps: op
                    }
                );
            })
            .catch((err) => {
                console.error(err);
            })
    }

    // Stores search term into state as it's being typed into the input bar
    handleChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({ searchTerm: value });
    }

    // Filters through data based on search term upon clicking search button
    handleSearch = (event) => {
        event.preventDefault();
        let searchResults = this.state.allOps.filter((opportunity) => {
            if (opportunity.AgencyName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) >= 0) {
                return true;
            } else if (opportunity.WhatWeDo.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({ results: searchResults });
    }

    // Changes the order of the search results
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

    // Switches sort order to ascending
    handleAscending = (event) => {
        event.preventDefault();
        this.setState({ displayOrder: true });
        this.changeOrder();
    }

    // Switches sort order to descending
    handleDescending = (event) => {
        event.preventDefault();
        this.setState({ displayOrder: false });
        this.changeOrder();
    }

    // Shows all opportunities again.
    handleAll = (event) => {
        event.preventDefault();
        this.setState({ results: this.state.allOps });
    }

    render() {
        return (
            <div>
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
                                    <Button addonType="append" type="submit" className="btn btn-info v-btn" onClick={this.handleSearch}>Search</Button>
                                    <Button type="sort" className="btn btn-info v-btn" onClick={this.handleAscending}>Sort Ascending</Button>
                                    <Button type="sort" className="btn btn-info v-btn" onClick={this.handleDescending}>Sort Descending</Button>
                                    <Button className="btn btn-info v-btn" onClick={this.handleAll}>Show All</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    {this.state.results.map((opportunity) => { return <Result opportunity={opportunity} /> })}
                </div>
                <footer>
                    <address className="text-center">&copy; Madison Laughlin 2018 <br />
                        <a href="mailto:laughmj5@uw.edu">Email here</a><br />
                        or <a href="tel:+1-206-819-5148">call this number.</a><br />
                        Data from <a href="https://catalog.data.gov/dataset/bloomington-volunteer-network-partner-organizations">City of Bloomington Volunteer Network Website</a>
                    </address>
                </footer>
            </div>
        )
    }
}

// Renders a singular volunteer opportunity.
class Result extends Component {
    render() {
        return (
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