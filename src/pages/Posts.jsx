import { useState, useEffect } from 'react';
import './Post.css';

const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('https://codebuddy.review/posts');
    const data = await response.json();
    console.log(data.data.posts);
    await setData(data.data.posts);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {loading && 'loading...'}
      <div className="posts">
        {data.map(d => (
          <div key={d.id} className="card">
            <span>id: {d.id}</span>
            <br />
            <span>firstName: {d.firstName}</span>
            <br />
            <span>lastName: {d.lastName}</span>
            <br />
            <span>writeup: {d.writeup}</span>
            <br />
            <img src={d.image} width="200" height="auto" />
            <br />
            <img src={d.avatar} alt="avatar image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
