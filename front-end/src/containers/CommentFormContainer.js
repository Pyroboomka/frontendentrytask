import React, { Component } from 'react'
import { submitComment } from '../actions/articlesActions'

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.submitComment = this.submitComment.bind(this)
  }

  handleChange (e) {
    this.setState({
      text: e.target.value
    })
  }

  submitComment (e) {
    const { dispatch, articleId } = this.props
    let newComment = {
      article: articleId,
      text: this.state.text,
      user: 'Anonymous'
    }
    e.preventDefault()
    if (validate(this.state.text)) {
      dispatch(submitComment(newComment))
      this.setState({
        text: ''
      })
    }
    function validate (text) {
      return text.trim() !== ''
    }
  }

  render () {
    return (
      <div className='comment-form'>
        <form onSubmit={this.submitComment}>
          <h4>Want to leave a comment?</h4>
          <label>Text
            <textarea rows={4} cols={50} value={this.state.text} onChange={this.handleChange.bind(this)} />
          </label>
          <div className='fl-r-wrap'>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
}

export default CommentForm
