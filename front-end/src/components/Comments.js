import React, { Component } from 'react'

class Comments extends Component {
  render () {
    const { commentsMap } = this.props
    return (
      <div className='comments-container'>
        <h3>Comments: {commentsMap.size}</h3>
        {commentsMap.map(item => {
          return <div key={item.get('id')} className='comment'>
            <h4>{item.get('user')}</h4>
            <p>{item.get('text')}</p>
          </div>
        })}
        <hr />
      </div>
    )
  }
}
export default Comments
