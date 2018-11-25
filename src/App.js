import React, { Component } from 'react';
import Header from './Components/Header';
import { Container, Row, Col } from 'reactstrap';
import Post from './Components/Post';
import Volunteer from './Components/Volunteer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import uuid from 'uuid';

import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Container className="py-3 bg-light px-0">
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <Col>
                <Switch>
                  <Route exact path="/justvote/" component={Post} />
                  <Route exact path="/justvolu/" component={Volunteer} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;