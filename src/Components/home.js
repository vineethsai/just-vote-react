import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';



class home extends Component {

  render() {
    return (
      <div className = "text-center">
      {/* <Header /> */}
      <Container className="py-3 bg-light px-0">
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">>
            <div className = "text-center">
            <h1>Be Informed</h1>
                <be />
                <h2>Find out about volunteer oppurtinities and your elected officials here!</h2>
                <br />
            </div>
            <Col>
            <img src={'https://kmrciugjeu-flywheel.netdna-ssl.com/wp-content/uploads/2018/07/raised-hands-900x449.jpg'} alt="landing" />
            </Col>
            </Row>
            </Container>
            </div>
    );
  }
}

export default home;