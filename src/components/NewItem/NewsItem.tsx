import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INewsItem } from "../../../types";

export const NewsItem = () => {
  const [item, setItem] = useState<INewsItem | null>();
  const { id } = useParams();

  async function requestNewsItem() {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:7070/private/news/${id}`, {
      method: 'GET',
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setItem(data);
  }

  useEffect(() => {
    requestNewsItem();
  }, [])

  return (
    <div className="item-wrapper">
      <img src={item?.image} />
      <h2>{item?.title}</h2>
      <p>{item?.content}</p>
    </div>
  )
}
