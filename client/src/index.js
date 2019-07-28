import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import logo from './logo.svg'
import axios from 'axios'
// class App for UI component
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginStatus: false,
      name: '',
      resdata: '',
      errormessage: ''
    }
    this.logout = this.logout.bind(this)
    this.secure = this.secure.bind(this)
    this.unsecure = this.unsecure.bind(this)
  }
  componentDidMount () {
  /* This request will get user details from the server. If user is authentiated sucessfully
  it will return a response with user details else it will throw error.
  */
    axios
      .get('/user')
      .then(res => {
        this.setState({ loginStatus: true, name: res.data.user.displayName })
      })
      .catch(err => {
        console.log(err)
      })
  }
  logout () {
    // This will logout user from the current session and delete the session.
    axios
      .get('/logout')
      .then(res => {
        if (res.status === 200) {
          this.setState({ loginStatus: false, resdata: '', errormessage: '' })
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({ resdata: '', errormessage: '' })
      })
  }
  secure () {
    /* This route is sample for secure route for authenticated users. */
    axios
      .get('/secure')
      .then(res => {
        console.log(res.data.user)
        this.setState({ resdata: JSON.stringify(res.data.user) })
      })
      .catch(err => {
        this.setState({ resdata: '', errormessage: 'unauthorized access ' + err })
      })
  }

  unsecure () {
    // This route is sample route for unsecure path. This will not be impacted even if user is unathenticated.
    axios
      .get('/unsecure')
      .then(res => {
        this.setState({ resdata: JSON.stringify(res.data.result) })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    return (
      <div className='App'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Facebook Auth</h1>
        {this.state.loginStatus ? <b>{this.state.name}&nbsp;&nbsp;</b> : <button><a href='http://localhost:4000/login'>login</a></button>}
        &nbsp;&nbsp;
        <button onClick={this.logout}>logout</button><br /><br />
        <button onClick={this.unsecure}>Unsecured route </button>
        <button onClick={this.secure}>Secured route </button><br /><br />
        {this.state.resdata}
        {this.state.errormessage}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
