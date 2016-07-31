import React from 'react'

export default class PostBox extends React.Component {
	constructor() {
		super()

		this.state = {
			text: '',
			isSaving: false,
		}
	}

	onCreatePost(status) {
		this.setState({isSaving:true})
		let post = {
			content: this.state.text,
			status: status,
			categories: [ this.props.category.id ],
			format: 'status',
		}
		window.apiHandler.post('/wp/v2/posts', post)
			.then(data => {
				this.props.onDidPublish(data)
				this.setState({ isSaving: false, text: '' })
			})
	}

	render() {
		return <form className="PostBox">
			<div className="user-detail">
				<img src={this.props.user.avatar_urls['96']} />
				You
			</div>
			<textarea
				value={this.state.text}
				rows={4}
				onChange={e => this.setState({ text: e.target.value })}
				disabled={this.state.isSaving}
			/>
			{this.state.isSaving ?
				<p>Saving...</p>
			:
				<p className="actions">
					<button className="secondary" onClick={() => this.onCreatePost('pending')}>Submit for review</button>
					<button className="primary" onClick={() => this.onCreatePost('publish')}>Publish</button>
				</p>
			}
		</form>
	}
}

PostBox.propTypes = {
	onDidPublish: React.PropTypes.func.isRequired,
	category: React.PropTypes.object.isRequired,
	user: React.PropTypes.object.isRequired,
}
