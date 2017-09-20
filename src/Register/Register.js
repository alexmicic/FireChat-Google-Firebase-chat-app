import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../actions/user.actions';
import { authService } from '../services/auth.service';
import logo from '../logo.svg';

const RegisterForm = styled.div`
  display: flex;
  width: 100wv;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.div`
  position: relative;
  width: 200px;
  margin-bottom: 2rem;
  dislay: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  max-width: 200px;
`;

const LogoSpan = styled.span`
  position: absolute;
  bottom: 10px;
  right: 35px;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: lowercase;
  color: #1071d3;

  > span {
    color: #0790fd;
  }
`;


const Heading = styled.h1`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  input + input {
    margin-bottom: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  line-height: 2rem;
  margin-bottom: 1rem;
  padding: .5rem 1rem;
  outline: none;
  border: 1px solid #eee;
`;

const Button = styled.button`
  width: 100%;
  line-height: 2rem;
  display: block;
  padding: .5rem;
  background: #03A9F4;
  color: #fff;
  border: none;
  transition: opacity .3s;

  &:hover {
    cursor: pointer;
    opacity: .75;
  }
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: block;
  margin-top: 1rem;
  text-align: center;
  transition: opacity .3s;

  &:hover {
    cursor: pointer;
    opacity: .75;
  }
`;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if ( authService.isAuth() ) {
      this.props.gotoHome();
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    if (email && password) {
      this.props.register(email, password);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <RegisterForm>
        <Logo>
          <LogoImg src={logo}/>
          <LogoSpan>Fire<span>chat</span></LogoSpan>
        </Logo>
        <Heading>Register with your email and password</Heading>
        <Form onSubmit={this.onSubmit}>
          <Input type="text" name="email" placeholder="Your email" value={email} onChange={this.onChange} required />
          <Input type="password" name="password" placeholder="Your password" value={password} onChange={this.onChange} required />
          <Button>Register</Button>
          <StyledLink to={'/login'}>Already have an account? Sign in.</StyledLink>
        </Form>
      </RegisterForm>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  register: (email, password) => userActions.register(email, password),
  gotoHome: () => push('/'),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Register);
