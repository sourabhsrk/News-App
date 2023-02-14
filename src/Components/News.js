import React, {useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props){
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchData = async () =>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pagesize}&page=${page}`;
        let data = await fetch(url);
        let parsedata = await data.json();
        setArticles(articles.concat(parsedata.articles));
        setTotalResults(parsedata.totalResults);
        setPage(page+1);
        setLoading(false);
        
        props.setProgress(100);
    }
    
    useEffect(()=>{
        document.title = `NewsMoneky - ${capitalizeFirstLetter(props.category)}`;
        fetchData();
    },[])// eslint-disable-line react-hooks/exhaustive-deps
   
    const fetchMoreData = async () => {
    
        setTimeout(()=>{
            fetchData();
        },1500)
      };

 
    return (
      <>
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewsMoneky - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spiner/>}
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length!==totalResults}
        loader={<Spiner/>}
        >
        <div className="container">
            <div className="row">
                {articles.map((element,index)=>{
                    return  <div className="col-md-4 my-3" key={index}>
                    <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
                    }) }
            </div>
        </div>
        </InfiniteScroll>
      </>
    )
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
