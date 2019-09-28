import React from 'react';
import './modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fullName: '', email: '', confEmail: null, isSending: false, success: false, invalid: false, data:'' }
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.confEmail !== this.state.email) {
      this.setState({ displayError: true, invalid: true })
      return
    }

    this.setState({
      invalid: false,
      displayErrors: false,
      isSending: true,
    });

    const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ 'name': this.state.fullName, 'email': this.state.email }),
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
      .then((parseData) => {
        return parseData.json()
      })
      .then((data) => {
        this.setState({ isSending: false, success: true, data:data })
        console.log(data)
      }).catch((err) => {
        this.setState({ invalid: true, isSending: false })
      })

  }

  close = () => {
    this.setState({ success: false })
    this.props.close()
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { invalid, displayError, isSending, success } = this.state;
    return (
      <div className="backdrop">
        {!success && <div className="modalContent">
          <form noValidate className={displayError ? 'displayError' : ''}>
            <div className="title">Request an invate</div>
            <div className="dash">___</div>
            <input name="fullName" required onChange={this.handleInput} placeholder="Full name" />
            <input name="email" required onChange={this.handleInput} type="email" placeholder="Email" />
            <input name="confEmail" required onChange={this.handleInput} type="email" placeholder="Confirm email" />
            <button onClick={this.handleSubmit} className="submitBtn">{isSending ? 'Sending,please wait' : 'send'}</button>
            {invalid && <p>Error message from server here.</p>}
          </form>
        </div>}
        {
          success &&
          <div className="doneModal">
            <div className="doneContent">
              <div className="title">All done!</div>
              <div className="dash">____</div>
              <div>You will be one of the first to experience</div>
              <div>Broccoli & Co. when we launch.</div>
              <button className="doneBtn" onClick={this.close}>OK</button>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Modal
