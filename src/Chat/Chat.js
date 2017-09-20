import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../actions/user.actions';
import { authService } from '../services/auth.service';

const Wrapper = styled.div`
  display: flex;
  width: 100wv;
  height: 100vh;
  align-items: center;
  justify-content: baseline;
  flex-direction: column;
`;

const Messages = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 120px - 2.5rem);
  align-items: left;
  justify-content: flex-end;
  flex-direction: column;
  background: linear-gradient(to bottom, #fff ,#f8f8f8);
  font-size: .875rem;

  > div {
    padding: 1rem;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

    > li {
      margin-bottom: 1rem;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      &:last-child {
        margin-bottom: 0;
      }

      &.active {
        text-align: right;
        justify-content: flex-end;

        .message {
          background: #fff;
          color: #333;
          box-shadow: 0 3px 5px rgba(0,0,0,.05);

          .user {
            color: #1071d3;
            border-color: #eee;

            .date {
              color: #c5c5c5;
            }
          }
        }
      }

      span {
        display: block;
      }

      .message {
        background: #1071d3;
        color: #fff;
        padding: .5rem .75rem;
        border-radius: .5rem;
        box-shadow: 0 3px 5px rgba(0,0,0,.2);
        display: inline-block;

        .user {
          font-size: .75rem;
          font-weight: 300;
          color: #d2d8de;
          border-bottom: 1px solid #6196cc;
          padding-bottom: .5rem;
          margin-bottom: .5rem;

          .date {
            display: inline-block;
            color: #7fa8d0;
          }
        }
      }

      .user-icon {
        display: inline-block;
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 3px 5px rgba(0,0,0,.1);
        margin-right: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
        }
      }
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  min-height: 100px;
  display: flex;
  background: #fff;
  padding: 1rem;
  border: 0;
  outline: none;
  resize: none;
  box-shadow: 0 -6px 10px rgba(0,0,0,.02), 0 6px 10px rgba(0,0,0,.02);
  z-index: 9;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #f8f8f8, #fff);
  padding: 0 .5rem;
  font-size: .75rem;

  > button {
    border: 0;
    padding: 4px .5rem;
    background: #333;
    color: #fff;
    transition: opacity .3s;
    font-size: .75rem;

    &:hover {
      cursor: pointer;
      opacity: .75;
    }
  }
`;

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messageList: [],
      firebaseObj: JSON.parse(localStorage.getItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]'))
    }

    this.onLogout = this.onLogout.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if ( !authService.isAuth() ) {
      this.props.gotoLogin();
    }

    this.props.onListen((response) => {
      this.setState({
        messageList: response
      });

      setTimeout(() => {
        let messages = document.getElementById('messages');
        let messagesUl = document.getElementById('messages-ul');
        messages.scrollTop = messagesUl.scrollHeight + 32;
      }, 10);
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onLogout(e) {
    this.props.signOut();
  }

  onKeypress(e) {
    if( e.key === 'Enter') {

      e.preventDefault();

      if ( this.state.message !== '' ) {
        this.props.postMessage( this.state.message );

        this.setState({
          message: ''
        });
      }
    }
  }

  formatDate(dateUnix) {
    let d = new Date(dateUnix);
    return d.toLocaleString('en-US');
  }

  render() {
    const { message, messageList } = this.state;
    return (
      <Wrapper>
        <Messages>
          <div id="messages">
            <ul id="messages-ul">
              {
                messageList.map((item, index) =>
                  <li key={index} className={this.state.firebaseObj.uid === item.userId ? 'active' : ''}>
                    <span className="user-icon">
                      <img src={item.photoURL} alt=""/>
                    </span>
                    <span className="message">
                      <span className="user">{item.displayName} <span className="date">wrote on: {this.formatDate(item.timestamp)}</span></span>
                      <span className="text">{item.message}</span>
                    </span>
                  </li>
                )
              }
            </ul>
          </div>
        </Messages>
        <TextArea placeholder="Type here your message and hit ENTER" name="message" maxLength="255"
          onKeyPress={this.onKeypress} onChange={this.onChange} value={message}></TextArea>
        <Footer>
          <button onClick={this.onLogout}>LOGOUT</button>
          <p>Copyright &copy; 2017. All rights reserved.</p>
        </Footer>
      </Wrapper>
    );
  }
}

//<button onClick={() => this.props.changePage()}>Go to login page via redux</button>

const mapDispatchToProps = dispatch => bindActionCreators({
  signOut: () => userActions.signOut(),
  postMessage: (message) => userActions.postMessage(message),
  onListen: (callback) => userActions.onListen(callback),
  gotoLogin: () => push('/login')
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Chat);
