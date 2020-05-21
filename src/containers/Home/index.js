import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import HomeHeader from './components/HomeHeader'
import Footer from '../../components/Footer'
import Banner from './components/Banner'
import Activity from './components/Activity'
import { actions as homeActions, getDiscounts, getLikes, getPageCountOfLikes } from '../../redux/modules/home'
class Home extends Component {
  componentDidMount() {
    this.props.homeActions.loadDiscounts()
  }
  render() {
    const { discounts, likes, pageCount } = this.props
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts} />
        <LikeList data={likes} pageCount={pageCount} fetchData={this.props.homeActions.loadLikes} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  discounts: getDiscounts(state),
  likes: getLikes(state),
  pageCount: getPageCountOfLikes(state)
})

const mapDisoatchToProps = dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch)
})

export default connect(mapStateToProps, mapDisoatchToProps)(Home)