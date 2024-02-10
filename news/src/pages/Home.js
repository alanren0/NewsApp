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
  // const [moreNews, setMoreNews] = useState([]);

  // useEffect(() => {
  //   setNews([...news, ...moreNews]);
  // }, [page, moreNews, navigate]);

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
    // let data = topTestData;
    // if (type === "all") {
    //   data = allTestData;
    // }

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


const allTestData = {
  "meta": {
      "found": 13916454,
      "returned": 3,
      "limit": 3,
      "page": 1
  },
  "data": [
      {
          "uuid": "e3c88fa3-7fd9-4689-9df0-e89020079a55",
          "title": "Dubai, Microsoft partner to power emirate’s digital economy",
          "description": "The collaboration with Microsoft will drive Dubai’s digital economy growth and is in line with the ambitious objectives of the D33 agenda",
          "keywords": "",
          "snippet": "Image: Getty Images\n\nThe Dubai Department of Economy and Tourism (DET) and Microsoft have inked a deal to fuel the emirate’s innovation ambitions, marking a s...",
          "url": "https://gulfbusiness.com/det-microsoft-to-power-emirates-innovation-drive/",
          "image_url": "https://gulfbusiness.com/wp-content/uploads/2024/02/Microsoft-and-DRT-sign-deal-to-drive-innovation-in-Dubai-GettyImages-452292668-1.jpeg",
          "language": "en",
          "published_at": "2024-02-06T02:33:47.000000Z",
          "source": "gulfbusiness.com",
          "categories": [
              "business"
          ],
          "relevance_score": null
      },
      {
          "uuid": "eff26e42-db4b-40da-8a32-f377b303a19b",
          "title": "King Charles III's cancer treatment: From Prince William to Earl James, understanding the order of succession to the British Throne",
          "description": "As King Charles III battles cancer, we break down the line of succession to the British throne, from Prince William to James, Viscount Severn.",
          "keywords": "King Charles III, King Charles, Cancer, King Charles III Cancer, King Charles Cancer, King Charles III Cancer treatment, King Charles Cancer treatment, British Monarchy, Succession, British Royal Family, Prince William, Princess Kate, Princess Catherine, Prince Harry, Meghan Markle, Prince George, Princess Charlotte, Prince Louis, Archie Mountbatten-Windsor, Lilibet Mountbatten-Windsor, Prince Andrew, Princess Beatrice, Princess Eugenie, Prince Edward, James Viscount Severn",
          "snippet": "King Charles III, despite his ongoing cancer treatment, continues his reign as Britain's monarch and head of state. The King, aged 75, has begun a schedule of r...",
          "url": "https://www.businesstoday.in/latest/world/story/king-charles-iiis-cancer-treatment-from-prince-william-to-earl-james-understanding-the-order-of-succession-to-the-british-throne-416309-2024-02-06",
          "image_url": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202402/65c199d3a7eb0-the-king--aged-75--has-begun-a-schedule-of-regular-treatments--during-which-time-he-has-been-advised-063042516-16x9.jpg",
          "language": "en",
          "published_at": "2024-02-06T02:31:50.000000Z",
          "source": "businesstoday.in",
          "categories": [
              "business",
              "general"
          ],
          "relevance_score": null
      },
      {
          "uuid": "9309f340-b7c1-4011-9d8e-cbc2cc26e639",
          "title": "ALIENWARE 27 360HZ QD-OLED GAMING MONITOR - AW2725DF $1359.60 ($1264.43 with Student Discount) Delivered @ Dell",
          "description": "Deal: ALIENWARE 27 360HZ QD-OLED GAMING MONITOR - AW2725DF $1359.60 ($1264.43 with Student Discount) Delivered @ Dell, Store: Dell, Category: Computing",
          "keywords": "",
          "snippet": "Like this https://www.ozbargain.com.au/node/830076 but better for $60 more, 120 more hz and better qd oled vs woled\n\nstudent discount: https://www.ozbargain.com...",
          "url": "https://www.ozbargain.com.au/node/830096",
          "image_url": "https://files.ozbargain.com.au/n/96/830096x.jpg?h=bb179a9d",
          "language": "en",
          "published_at": "2024-02-06T02:30:36.000000Z",
          "source": "ozbargain.com.au",
          "categories": [],
          "relevance_score": null
      }
  ]
}

const topTestData = {
  "meta": {
      "found": 879817,
      "returned": 3,
      "limit": 3,
      "page": 1
  },
  "data": [
      {
          "uuid": "60e2644b-94ee-4301-bb99-21607847305f",
          "title": "Pierre Engvall scores late as Islanders beat Maple Leafs 3-2",
          "description": "Breaking News, Sports, Manitoba, Canada",
          "keywords": "",
          "snippet": "TORONTO (AP) — Former Toronto forward Pierre Engvall returned Monday night to score late and lift the New York Islanders over the Maple Leafs 3-2.\n\nKyle MacLe...",
          "url": "https://www.winnipegfreepress.com/sports/hockey/nhl/2024/02/05/pierre-engvall-scores-late-as-islanders-beat-maple-leafs-3-2",
          "image_url": "https://www.winnipegfreepress.com/wp-content/uploads/sites/2/2022/11/fb-og-image.png",
          "language": "en",
          "published_at": "2024-02-06T03:10:14.000000Z",
          "source": "winnipegfreepress.com",
          "categories": [
              "general"
          ],
          "relevance_score": null,
          "locale": "ca"
      },
      {
          "uuid": "72bff35e-da6f-48e0-8b9b-2448076b0f48",
          "title": "Coroner's inquest to be held in spring for Innu man who froze to death in Montreal",
          "description": "A coroner's inquest will begin in May into the death of a homeless man who froze while trying to find a warm place to sleep at night in Montreal.",
          "keywords": "",
          "snippet": "A coroner's inquest will begin in May into the death of a homeless man who froze while trying to find a warm place to sleep at night in Montreal.\n\nOn Jan. 17, 2...",
          "url": "https://montreal.ctvnews.ca/coroner-s-inquest-to-be-held-in-spring-for-innu-man-who-froze-to-death-in-montreal-1.6757320",
          "image_url": "https://www.ctvnews.ca/content/dam/ctvnews/en/images/2021/1/19/raphael-andre-1-5272576-1642554505321.jpg",
          "language": "en",
          "published_at": "2024-02-06T03:08:12.000000Z",
          "source": "montreal.ctvnews.ca",
          "categories": [
              "general"
          ],
          "relevance_score": null,
          "locale": "ca"
      },
      {
          "uuid": "18368404-2e8c-4be7-a507-8e49ffae05fc",
          "title": "Johnson scores 24, New Orleans routs Houston Christian 84-58",
          "description": "Breaking News, Sports, Manitoba, Canada",
          "keywords": "",
          "snippet": "NEW ORLEANS (AP) — Jordan Johnson had 24 points in New Orleans’ 84-58 victory against Houston Christian on Monday night.\n\nJohnson added five rebounds and th...",
          "url": "https://www.winnipegfreepress.com/uncategorized/2024/02/05/johnson-scores-24-new-orleans-routs-houston-christian-84-58",
          "image_url": "https://www.winnipegfreepress.com/wp-content/uploads/sites/2/2022/11/fb-og-image.png",
          "language": "en",
          "published_at": "2024-02-06T03:05:47.000000Z",
          "source": "winnipegfreepress.com",
          "categories": [
              "general"
          ],
          "relevance_score": null,
          "locale": "ca"
      }
  ]
}