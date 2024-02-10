import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsList from "../components/NewsList";
import HomeBtn from "../components/HomeBtn";
import SavedBtn from "../components/SavedBtn";
import '../App.css';

function Saved({savedNews, setSavedNews}) {

  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, [navigate, savedNews]);

  const fetchNews = async () => {
    const savedList = Array.from(savedNews);
    
    const allData = []

    for (let i=0, n=savedList.length; i < n; i++) { 
      let res = await fetch(`https://api.thenewsapi.com/v1/news/uuid/${savedList[i]}?api_token=${process.env.REACT_APP_API_KEY}`);
      let data = await res.json();

      allData.push(data);
    }
    
    setNews(allData);
  }

  return (
    <>
      <div className="header-background">
        <div className="header">
          <div className="header-top">
            <HomeBtn/>
            <div>
            </div>
            <SavedBtn/>
          </div>
        </div>
      </div>

      <div className="heading">
        <h1>SAVED ARTICLES</h1>
      </div>

      <div className="main-container">
        <div className="side-area">
          <div className="categories-container">
          </div>
        </div>
        <div className="news-area">
          {news &&
            <NewsList newsList={news} savedNews={savedNews} setSavedNews={setSavedNews}/>
          }
        </div>
      </div>
      
    </>
  )
}

export default Saved
