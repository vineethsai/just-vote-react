import React, { Component } from 'react';
import Header from './Components/Header';
import { Container, Row, Col } from 'reactstrap';
import Post from './Components/Post';
import Volunteer from './Components/Volunteer';
import {HashRouter, Route, Switch} from 'react-router-dom';
import home from './Components/home'
import './App.css';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/home/" component={home} />
          </Switch>
          <Container className="py-3 bg-light px-0">
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <Col>
                <Switch>
                  <Route path="/justvote/" component={Post} />
                  <Route path="/justvolu/" component={Volunteer} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </HashRouter>
    );
  }
}

export default App;