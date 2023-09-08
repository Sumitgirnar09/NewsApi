import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';



export class News extends Component {

  static defaultProps={
    country : 'in',
    pageSize : 8,
    category : 'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("Cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08904cd7fb3f448d8b72fe916cddde18&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
    totalResults : parsedData.totalResults,
    loading:false}
      );
  }

  handlePrevClick = async()=>{
    console.log("Previous Clicked")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08904cd7fb3f448d8b72fe916cddde18&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
    })
  }

  handleNextClick = async()=>{
    console.log("Next Clicked page no",this.state.page);
    if(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))
    {
      console.log("Page Limit Exceed")
      alert("All News Over ");
    };

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08904cd7fb3f448d8b72fe916cddde18&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
    })
  
  }

  render() {
    // console.log("render");
    return (
      <>
      <div className="container">
        <h1 className="text-center">Todays News</h1>
        <div className="text-center">
          {this.state.loading && <Spinner/>}         
        </div>
        <div className="row d-flex justify-content-center">{!this.state.loading && this.state.articles.map((element) => {
            return (
                <div className="col-md-3 mx-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
            );
          })}
        </div>
        <div className="container my-4 ">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button disabled={this.state.page<=1} class="page-link btn" onClick={this.handlePrevClick} href="#">
                &larr; Previous
                </button>
              </li>
              <li class="page-item">
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} class="page-link btn" onClick={this.handleNextClick} href="#">
                Next &rarr;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      </>
    );
  }
}

export default News;
