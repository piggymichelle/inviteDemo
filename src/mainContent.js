import React from 'react';
import Modal from './modal'

import './App.css';
class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpenModal: false}
    this.openModal = this.openModal.bind(this)
  }
  openModal = () => {
    this.setState({isOpenModal: !this.state.isOpenModal})
  }
  close =() =>{
    this.setState({isOpenModal:false})
  }
  render() {
    return (
      <div className="container">
        <div className="header"><div className="headerContent">Broccoli & Co.</div></div>
        <div className="mainContent">
          <div className="slogan">
            <div>A better way</div>
            <div>to enjoy every day.</div>
          </div>
          <p>Be the first to know when we launch</p>
          <button onClick={this.openModal}>Request an invitation</button>
        </div>
        <div className="footer">
          <div>Made with in Melbourne</div>
          <div>@ 2016 Broccoli & Co All rights reserved.</div>
        </div>
        <Modal show={this.state.isOpenModal} close={this.close}/>
      </div>
    )
  }
}
export default Content