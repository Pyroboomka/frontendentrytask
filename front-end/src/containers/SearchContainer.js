import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateFrom: '2013-01-01',
      dateTo: new Date().toISOString().slice(0, 10),
      title: ''
    }
  }

  renderSearchResults () {
    const { data } = this.props
    const results = data
      .filter(item => inRange(item, this.state.dateFrom, this.state.dateTo))
      .filter(item => item.title.indexOf(this.state.title) > -1)
    return (
      <div className='search-results'>
        <h4>Search results:</h4>
        {results.size === 0
          ? <div>No results</div>
          : results.map(
            (item, key) => (
              <div>
                <Link to={`/article/${key}`}>{item.get('title')}</Link>
              </div>)
            )
          }
      </div>
    )

    function inRange (item, from, to) {
      const itemDate = new Date(item.get('date'))
      let fromD = new Date(from)
      let toD = new Date(to)
      return (fromD <= itemDate && itemDate <= toD)
    }
  }

  handleDateChange (source, e) {
    this.setState({
      [source]: e.target.value
    })
  }
  handleSearchInputChange (e) {
    this.setState({
      title: e.target.value
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='search-parameters'>
          <h4>Search parameters:</h4>
          <div className='search-inputs-wrap'>
            <label>Date from:</label>
            <input type='date' value={this.state.dateFrom} onChange={this.handleDateChange.bind(this, 'dateFrom')} />
            <label>Date to:</label>
            <input type='date' value={this.state.dateTo} onChange={this.handleDateChange.bind(this, 'dateTo')} />
            <label>Article title:</label>
            <input type='text' value={this.state.title} onChange={this.handleSearchInputChange.bind(this)} />
          </div>
        </div>
        <hr />
        {this.renderSearchResults()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.getIn(['articles', 'data']),
    router: state.router
  }
}

export default connect(mapStateToProps)(Search)
