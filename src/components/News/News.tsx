import { useEffect, useState } from "react";
import { INewsItem } from "../../../types";
import { Link } from "react-router-dom";

export const News = () => {
  const [news, setNews] = useState([]);

  async function requestNews(token: string) {
    const response = await fetch('http://localhost:7070/private/news', {
      method: 'GET',
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    const data = await response.json();
    setNews(data);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      requestNews(storedToken);
    }
  }, []);

  return (
    <div className="news-wrapper">
      {news.map((item: INewsItem) => (
        <div key={item.id} className="news-item">
          <img src={item.image} />
          <Link to={`/news/${item.id}`}><h3 className="news-title">{item.title}</h3></Link>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
}
