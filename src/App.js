import React, { Component } from 'react';
import Header from './Components/Header';
import { Container, Row, Col } from 'reactstrap';
import Post from './Components/Post';
import Volunteer from './Components/Volunteer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import home from './Components/home'
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/home/" component={home} />
          </Switch>
          <Container className="py-3 bg-light px-0">
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <Col>
                <Switch>
                  <Route exact path="/justvote/" component={Post} />
                  <Route exact path="/justvolu/" component={Volunteer} />
                  {/* <Route exact path="/home/" component={App} /> */}
                </Switch>
              </Col>
              {/* <Col>
                <h1></h1>
              </Col> */}
            </Row>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;