import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';

class CoinComponent extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount(){
    const data = {type: this.props.match.params.type};
    api.get_price(data);
  }

  render() {
    const type = this.props.match.params.type;

    const price = this.props.price[type];

    return (
      <Card style={{marginTop:10}}>
        <CardBody>
          <CardTitle>{type}</CardTitle>
          <CardText>Price (USD): {price}</CardText>
        </CardBody>
      </Card>
    );
  }
}

const CoinPage = withRouter(connect((state) => ({ 
  price: state.price, 
}))(CoinComponent));

export default CoinPage;