import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeBtn from '../components/HomeBtn';
import SavedBtn from '../components/SavedBtn';
import NewsList from '../components/NewsList';
import '../App.css';

function SimilarNews({savedNews, setSavedNews}) {

  const navigate = useNavigate();
  const {id} = useParams();

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [original, setOriginal] = useState({});
  const [trigger, setTrigger] = useState(false); // use this to make sure news array is reset before fetching news

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    setNews([]);
    fetchOriginal();
    setTrigger(!trigger);
  }, [navigate]);

  useEffect(() => {
    fetchNews();
  }, [page, trigger]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setPage(page + 1);
  };

  const fetchOriginal = async () => {
    const res = await fetch(`https://api.thenewsapi.com/v1/news/uuid/${id}?api_token=${process.env.REACT_APP_API_KEY}`);
    const data = await res.json();

    setOriginal(data);

  }

  const fetchNews = async () => {
    setIsLoading(true);
    const res = await fetch(`https://api.thenewsapi.com/v1/news/similar/${id}?api_token=${process.env.REACT_APP_API_KEY}&page=${page}`);
    const data = await res.json();

    setNews([...news, ...data.data]);

    setIsLoading(false);
  }

  return (
    <>
      <div className="header-background">
        <div className="header">
          <div className="header-top">
            <HomeBtn/>
            <div className="small-news">
              <img src={original.image_url}/>
              <p>{original.description}</p>
            </div>
            <div>
            </div>
            <SavedBtn/>
          </div>
          
          <div className="header-buttons">
          </div>
        </div>
      </div>

      

      <div className="heading">
        <h1>SIMILAR NEWS</h1>
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
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
      
    </>
  )
}

export default SimilarNews
