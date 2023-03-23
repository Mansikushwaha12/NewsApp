
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsRabbit`;
  }
  // async updateNews(){
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&
  //   apiKey=589f836ba6b84253ae086b2c1cfce5da&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({
  //     articles: parseData.articles, 
  //     totalResults: parseData.totalResults, 
  //     loading:false
  //   })
  // }
  //compoDidMount --lifecycle method----run after render
  async componentDidMount() {
    // console.log("cdm");---2
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  handelPreviousClick = async () => {
    console.log("Previous");


    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let passData = await data.json()
    console.log(passData);
    this.setState({

      page: this.state.page - 1,
      articles: passData.articles,
      loading: false

    })
    // this.setState({page: this.state.page - 1});
    // this.updateNews();
  }

  handelNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let passData = await data.json()
      // console.log(passData);
      this.setState({

        page: this.state.page + 1,
        articles: passData.articles,
        loading: false
      })
    }
    // this.setState({page: this.state.page + 1});
    // this.updateNews();

  }




  render() {
    // console.log("render");--1
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsRabbit -Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
       
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
        

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handelPreviousClick}>&larr; Previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
