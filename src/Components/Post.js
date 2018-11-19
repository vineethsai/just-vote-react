import React, { Component } from 'react';
import {
    InputGroup, Container,
    InputGroupAddon,
    Table, Button, Form,
    Input, Row, Col, InputGroupText
} from 'reactstrap';
import axios from 'axios';
var _ = require('lodash');
class Post extends Component {

  constructor(){
  super()
  this.state = {
        division: [],
        offices: [],
        officers: [],
        address: '',
        fed: false,
        state: false,
        county: false,
        local: false
      }
      
    
  }
 
  handleChange = (event) => {    
    event.preventDefault();
    let value = event.target.value;
    this.setState({
        offices: this.state.offices,
        officers: this.state.officers,
        address: value
        // .replace(/ /g,'')
    });
  }

  handleClick = (event) => {    
    event.preventDefault();
    axios.get('https://www.googleapis.com/civicinfo/v2/representatives',
    {
        'params' : 
        {
            'key': 'AIzaSyBsP_HExLE7-6QINDS-5gGHNFyno8FW9F8',
            'electionId' : 2000,
            'address' : this.state.address
        }
    })
    .then(json => {
        console.log(json);
        this.setState({
            officers: json["data"]["officials"],
            offices: json["data"]["offices"],
            address: this.state.address,
            division: json["data"]["divisions"]
        });
    });
  }

    getFedValue(event) {
        if(this.state.fed)
        {
            this.setState({fed: false});
            console.log("fed false");
        }
        else
        {
            this.setState({fed: true});
            console.log("fed true");
        }
    }

    getStateValue(event) {
        if(this.state.state)
        {
            this.setState({state: false});
            console.log("statefalse");
        }
        else
        {
            this.setState({state: true});
            console.log("state true");
        }
    }

    getCountyValue(event) {
        if(this.state.county)
        {
            this.setState({county: false});
            console.log("county false");
        }
        else
        {
            this.setState({county: true});
            console.log("county true");
        }
    }

    getLocalValue(event) {
        if(this.state.local)
        {
            this.setState({local: false});
            // this.state.local = false;
            console.log("local false");
        }
        else
        {
            this.setState({local: true});
            console.log("local true");
        }
    }

    renderResults(searchLevel)
    {
        let i = 0;
        let contest = this.state["officers"];
        return this.state.offices.filter(rows =>
        {
            let j = this.state.offices.indexOf(rows);
            return (typeof rows != undefined && this.state.offices[j]["divisionId"].match(searchLevel))
        }
        // {
        //     let j = this.state.officers.indexOf(rows);
        //     if(j <= this.state.offices.length - 1)
        //     {
        //         // console.log(this.state.offices[j]['divisionId']);
        //         return(this.state.offices[j]['divisionId'].match(searchLevel));
        //     }}
        ).map(
            offices=>
        {
            
            let def_name = "unknown";
            i = this.state.offices.indexOf(offices);
            console.log(offices, i);
            // if(i < this.state.offices.length - 2)
            // {
            //     def_name = this.state.offices[i]['name'];
            // }
          let dic = contest[i];
          let can = dic['name'];
          let pic;
          let urls = dic['urls'];
          pic = 'http://zebconference.com/wp-content/uploads/2018/07/Blank-Person-Image.png';
          if('photoUrl' in dic)
          {
            pic = dic['photoUrl'];
          }
          let undef;
          if('urls' in dic)
          {
              undef = urls[0];
          }
          else
          {
              undef = "Not provided"
          }
          def_name = offices['name'];
          return (
              <tr>
                  <td>{can}</td>
                  <td>{ <img  src={pic} alt="sen" className="img-responsive" />}</td>
                  <td>{def_name}</td>
                  <td>{dic["party"]}</td>
                  <td>{undef}</td>
              </tr>
          );
        }
        );
    }

  render() {

    var federal_pattern = "ocd-division/country:us";
    var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
    var cd_pattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
    var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
    var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;
    // console.log(county);
    var list;
    if(this.state.fed)
    {
        list = this.renderResults(federal_pattern);
    }
    if(this.state.state)
    {
        list = this.renderResults(state_pattern);
        list = this.renderResults(cd_pattern);
    }
    if(this.state.county)
    {
        list = this.renderResults(county_pattern);
    }
    if(this.state.local)
    {
        list = this.renderResults(local_pattern);
    }
    if(!this.state.fed && !this.state.state && !this.state.county && !this.state.local)
    {
        list = this.renderResults("");
    }
    
      console.log(this.state);
    return (
        < div className = "text-center" >
           <h1 >Just Vote</h1>
           <br />
           <br />
           <h3>
               Enter your address to find and contact your federal, state, county and local elected representatives
           </h3>
           <br />
           <br />
           <Container fluid>
           <Row>
                <Col >
                    <Form inline>
                        <Input aria-label="Search" type="text" onChange={this.handleChange.bind(this)}/>
                        <Button  addonType="append" type="submit" className="btn btn-info"  onClick={this.handleClick.bind(this)}>
                        Submit</Button>
                    </Form>
                </Col>
            </Row>
           </Container>
           <br />
           <div>
                <div className="px-5 text-center">
                <h5 className="text-center">Show level of Government: </h5>
                <br />
                    <InputGroup>
                    <Row>
                        <Col>
                            <InputGroupAddon addonType="append">
                            < InputGroupAddon addonType="append" >Federal</InputGroupAddon>
                            <InputGroupText>
                                <Input addon onClick={this.getFedValue.bind(this)} type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                            
                        </Col>
                        <Col>
                            <InputGroupAddon addonType="append">
                            < InputGroupAddon  addonType="append">State</InputGroupAddon>
                            <InputGroupText>
                                <Input addon onClick={this.getStateValue.bind(this)} type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                        </Col>
                        <Col>
                            <InputGroupAddon addonType="append">
                            < InputGroupAddon  addonType="append">County</InputGroupAddon>
                            <InputGroupText>
                                <Input addon onClick={this.getCountyValue.bind(this)} type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                        </Col>
                        <Col>
                            <InputGroupAddon addonType="append">
                            < InputGroupAddon  addonType="append">Local</InputGroupAddon>
                            <InputGroupText>
                                <Input addon onClick={this.getLocalValue.bind(this)} type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                        </Col>
                    </Row>
                    </InputGroup>
                </div>
            </div>
           <br />
           <br />
           <Table responsive>
           <thead>
           <tr>
            <th>Official</th>
            <th>Photo</th>
            <th>Office</th>
            <th>Party</th>
            <th>Website</th>
          </tr>
           </thead>
           <tbody>
           {list}
           </tbody>
           
           </Table>
           
        </div>
    );
  }
  
}

export default Post;