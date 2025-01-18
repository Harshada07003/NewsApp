import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData); // Debug API response
    this.setState({
      articles: parseData.articles || [], // Fallback to empty array
      totalResults: parseData.totalResults || 0,
      loading: false,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData); // Debug API response
    this.setState({
      articles: this.state.articles.concat(parseData.articles || []),
      totalResults: parseData.totalResults || 0,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines - {this.props.category}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles?.length || 0} // Safeguard articles
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles?.map((element, index) => (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title || 'No title available'}
                    description={element.description || 'No description available'}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    source={element.source?.name}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
