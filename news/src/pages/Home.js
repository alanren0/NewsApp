import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import NewsList from "../components/NewsList";
import GetNewsBtns from "../components/GetNewsBtns";
import Search from "../components/Search";
import Categories from "../components/Categories";
import '../App.css';
import HomeBtn from "../components/HomeBtn";
import SavedBtn from "../components/SavedBtn";

function Home({savedNews, setSavedNews}) {

  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState();
  const [category, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("top");

  useEffect(() => {
    fetchNews(type);
  }, [search, category, page, navigate, type]);

  const fetchNews = async (type) => {
    let api = `https://api.thenewsapi.com/v1/news/${type}?api_token=${process.env.REACT_APP_API_KEY}&locale=ca&language=en&page=${page}`;

    if (search) {
      api = `${api}&search=${search}`;
    }
    if (category) {
      api = `${api}&categories=${category}`;
    }

    setIsLoading(true);
    const res = await fetch(api);
    const data = await res.json();

    setNews([...news, ...data.data]);
    
    setIsLoading(false);
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      <div className="header-background">
        <div className="header">
          <div className="header-top">
            <HomeBtn/>
            <div>
              <Search search={search} setSearch={setSearch} setPage={setPage} setNews={setNews}/>
            </div>
            <SavedBtn/>
          </div>
          
          <div className="header-buttons">
            <GetNewsBtns setNews={setNews} setType={setType} setPage={setPage} type={type}/>
          </div>
        </div>
      </div>

      <div className="heading">
        <h1>NEWS</h1>
      </div>

      <div className="main-container">
        <div className="side-area">
          <div className="categories-container">
            <Categories setCategory={setCategory} setPage={setPage} setNews={setNews}/>
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

export default Home

