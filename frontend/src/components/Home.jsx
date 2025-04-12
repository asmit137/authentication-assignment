import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Home() {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.name });
      } catch (err) {
        setUser({ name: 'Guest' });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <h1>Hello, {user.name}</h1>
      <p>Welcome to your home page!</p>
    </div>
  );
}
