import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('watchlist/list');
        setWatchlist(response.data.data);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">WatchList List</h2>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            View Cryptocurrency
          </button>
          <div>
            <button
              className="bg-green-500 text-white p-2"
              onClick={() => navigate('/search-list')}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search Crypto And AddToWatchList
            </button></div>
        </div>
      </div>
      {watchlist.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Min Price</th>
                <th className="p-2 border">Max Price</th>
              </tr>
            </thead>
            <tbody key={watchlist.length}>
              {watchlist.map((crypto, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="p-2 border">{crypto.code}</td>
                  <td className="p-2 border">{crypto.minPrice}</td>
                  <td className="p-2 border">{crypto.maxPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No cryptocurrencies in the watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
