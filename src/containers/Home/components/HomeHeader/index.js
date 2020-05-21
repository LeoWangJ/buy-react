import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
export default class HomeHeader extends Component {
  render() {
    return (
      <div className="homeHeader">
        <header className="homeHeader__wrapper">
          <a className="homeHeader__city">北京</a>
          <a className="homeHeader__search">输入商户名、地点</a>
          <Link className="homeHeader__self" to={`/user`}>
            <div className="homeHeader__portrait" />
          </Link>
        </header>
      </div>
    )
  }
}
