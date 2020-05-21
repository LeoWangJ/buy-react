import React, { Component } from 'react'
import LikeItem from '../LikeItem'
import Loading from '../../../../components/Loading'


export default class LikeList extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.removeListener = false
  }
  componentDidMount() {
    if (this.props.pageCount <= 3) {
      document.addEventListener('scroll', this.handleScroll)
      this.props.fetchData()
    } else {
      this.removeListener = true
    }
  }
  componentDidUpdate() {
    if (this.props.pageCount >= 3 && !this.removeListener) {
      document.removeEventListener('scroll', this.handleScroll)
      this.removeListener = true
    }
  }
  componentWillUnmount() {
    if (!this.removeListener) {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    console.log(this.myRef)
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const screenHeight = document.documentElement.clientHeight
    const likeListTop = this.myRef.current.offsetTop
    const likeListHeight = this.myRef.current.offsetHeight
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData()
    }
  }

  render() {
    const { data, pageCount } = this.props
    return (
      <div className="likeList" ref={this.myRef}>
        <div className="likeList__header">猜你喜歡</div>
        <div className="likeList__list">
          {
            data.map((item, index) => {
              return <LikeItem key={item.id} data={item} />
            })
          }
        </div>
        {
          pageCount < 3 ?
            <Loading></Loading>
            :
            <a className="likeList__viewAll">
              查看更多
            </a>
        }
      </div>
    )
  }
}
