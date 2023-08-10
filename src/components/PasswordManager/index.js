import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'brown', 'blue']
class PasswordManager extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitInputs = event => {
    event.preventDefault()
    const {username, password, website} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValue = {
      id: v4,
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      latestList,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <li>
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logoImg"
          />
          <div className="sm-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="image1"
            />
            <form className="user-details" onSubmit={this.onSubmitInputs}>
              <h1 className="title">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="websiteImg"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="websiteImg"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="websiteImg"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="lg-mr-img"
            />
          </div>
          <div className="user-details-container">
            <div className="user-details-con">
              <div className="password-container">
                <h1 className="user-title">Your Passwords</h1>
                <p className="count">{newList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="websiteImg"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="input"
                  onChange={this.searchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="password-container">
              <input
                type="checkbox"
                className="check-box"
                id="check"
                onChange={this.showPassword}
              />
              <label className="label-password" htmlFor="check">
                Show passwords
              </label>
            </div>
            {!isTrue && (
              <div className="empty-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="emptyImg"
                />
                <p className="no-password"> No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="un-list">
                {newList.map(eachValue => (
                  <li className="list" id={eachValue.id} key={eachValue.id}>
                    <p className={`initial-color ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div className="password-content">
                      <p className="para">{eachValue.websiteName}</p>
                      <p className="para">{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="start-img"
                        />
                      )}
                      {isShow && <p className="para">{eachValue.Password}</p>}
                    </div>
                    <button
                      type="button"
                      data-testid="delete"
                      className="delete-button"
                      onClick={() => this.deleteItem(eachValue.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        className="delete-img"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </li>
    )
  }
}
export default PasswordManager
