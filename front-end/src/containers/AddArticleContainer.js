import React, { Component } from 'react'
import { submitArticle } from '../actions/articlesActions'
import { connect } from 'react-redux'

class AddArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      text: '',
      showError: false
    }
    this.submitArticle = this.submitArticle.bind(this)
  }

  handleChange (source, e) {
    this.setState({
      [source]: e.target.value
    })
  }

  submitArticle (e) {
    const { dispatch } = this.props
    let newArticle = {
      title: this.state.title,
      text: this.state.text,
      user: 'Placeholder'
    }
    e.preventDefault()
    if (validate(newArticle.title, newArticle.text)) {
      dispatch(submitArticle(newArticle))
      this.setState({
        title: '',
        text: ''
      })
    } else {
      this.setState({
        showError: true
      })
    }
    function validate (title, text) {
      return title.trim() !== '' && text.trim() !== ''
    }
  }

  render () {
    return (
      <div className='addArticle-form'>
        {this.state.showError ? <div className='error'>Something wrong with your inputs, try again</div> : null}
        <form onSubmit={this.submitArticle}>
          <div className='addArticle-titlewrap'>
            <label>Title:</label>
            <input className='addArticle-title'
              type='text' value={this.state.title}
              onChange={this.handleChange.bind(this, 'title')} />
          </div>
          <label>Text:
            <textarea rows={4} cols={50}
              value={this.state.text}
              onChange={this.handleChange.bind(this, 'text')} />
          </label>
          <div className='fl-r-wrap'>
            <input type='submit' value='Add' />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.get('articles'),
    router: state.get('router')
  }
}

export default connect(mapStateToProps)(AddArticle)
