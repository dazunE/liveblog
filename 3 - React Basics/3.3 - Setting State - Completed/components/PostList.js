import React from 'react'

export default class PostList extends React.Component {

  render() {

    let posts = this.props.posts    

    return <div>

      {posts.map( post => <p key={post.id}>{post.title}</p> )}

      <button
        type="Submit"
        onClick={this.props.refreshPosts}
      >
        Refresh Posts
      </button>


    </div>

  }

}
