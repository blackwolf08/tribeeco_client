import React from "react";
// import { connect } from "react-redux";
import ContentLoader from "react-content-loader";
import Post from "./Post.js";
import FeedEvent from "./FeedEvent.js";

import InfiniteScroll from "react-infinite-scroller";

const PostLoader = () => (
  <div className="bg-white p-3 mb-3">
    <ContentLoader
      height={160}
      width={500}
      speed={2}
      ariaLabel="Loading Posts"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
      <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
      <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
      <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
      <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
      <circle cx="30" cy="30" r="30" />
    </ContentLoader>
  </div>
);

class Posts extends React.PureComponent {
  state = {
    items: [],
    // itemsCount: this.props.feed.length,
    currentItemCount: 0
  };
  handleLoadMore = page => {
    const { currentItemCount } = this.state;
    // console.log(page, currentItemCount);
    // Use api to fetch more
    this.setState({
      items: this.props.feed.slice(0, currentItemCount + 8)
    });
    this.setState({ currentItemCount: currentItemCount + 8 });
  };
  render() {
    const { loaded, feed } = this.props;
    const { items, currentItemCount } = this.state;
    const hasMore = currentItemCount < feed.length;
    return (
      <>
        {loaded ? (
          feed.length > 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.handleLoadMore}
              hasMore={hasMore}
              loader={<PostLoader />}
            >
              {items.map((x, i) =>
                x.body ? (
                  <Post data={x} key={x.id} />
                ) : (
                  <FeedEvent data={x} key={x.id} />
                )
              )}
            </InfiniteScroll>
          )
        ) : (
          <>
            <PostLoader /> <PostLoader />
          </>
        )}
      </>
    );
  }
}

export default Posts;
