import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMoneky - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    fetchData = async () =>{
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pagesize}&page=${this.state.page}`;
        // this.setState({loading: true});
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedata.articles), 
            totalResults: parsedata.totalResults,
            page: this.state.page + 1,
            loading: false
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        console.log("did mount m hu");
        this.fetchData();
    }
    fetchMoreData = async () => {
        //this.setState({page: this.state.page + 1});
        setTimeout(()=>{
            //console.log(this.state.page);
            this.fetchData();
        },1500)
      };

    // handlePrevClick = async () =>{
    //     window.scrollTo(0,0);
    //     await this.fetchData(-1); 
    // }
    // handleNextClick = async () =>{
    //     window.scrollTo(0,0);  
    //     await this.fetchData(1);
    // }

  render() {
   // console.log("starting render");
    return (
      <>
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewsMoneky - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spiner/>}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length!==this.state.totalResults}
        loader={<Spiner/>}
        >
        <div className="container">
            <div className="row">
                {this.state.articles.map((element,index)=>{
                    return  <div className="col-md-4 my-3" key={index}>
                    <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
                    }) }
            </div>
        </div>
        {/* <div className="d-flex justify-content-between">
            <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}
        </InfiniteScroll>
      </>
    )
  }
}

News.propTypes = {
    country : PropTypes.string,
    category : PropTypes.string,
    pagesize: PropTypes.number
};
News.defaultProps = {
    country : "in",
    category : "general",
    pagesize: 6
};
