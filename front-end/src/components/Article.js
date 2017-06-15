import React, { Component } from 'react'

class Article extends Component {
  render () {
    const { data } = this.props
    let formattedDate = new Date(data.get('date')).toLocaleDateString()
    return (
      <div className='article'>
        <div className='fl-r-wrap'>
          <p>{formattedDate}</p>
        </div>
        <h3 className='article-title'>{data.get('title')}</h3>
      </div>
    )
  }
}
export default Article
