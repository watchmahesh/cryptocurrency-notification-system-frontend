import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
const CryptoList = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cryptocurrency data here (replace with your actual API call)
    const fetchData = async () => {
      try {
        const response = await api.get('/crypto/list');
        setCryptocurrencies(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);

        toast.error('Error fetching cryptocurrency data. Please try again');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cryptocurrency List</h2>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => navigate('/watch-list')}
          ><FontAwesomeIcon icon={faEye} className="mr-2" />
            View Watchlist
          </button>
          <div>
            <button
              className="bg-green-500 text-white p-2"
              onClick={() => navigate('/search-list')}
            ><FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search Crypto And AddToWatchList
            </button></div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">S.N</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Code </th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Market Cap</th>
              <th className="p-2 border">24h</th>
            </tr>
          </thead>
          <tbody>
            {cryptocurrencies.map((crypto, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-2 border">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                </td>
                <td className="p-2 border">
                  <span className="profile__logo-background">
                    <img
                      src={crypto.image}
                      srcSet={`${crypto.image}?size=30x30 1x, ${crypto.image}?size=60x60 2x, ${crypto.image}?size=90x90 3x`}
                      alt=""
                      loading="lazy"
                      width="26"
                      height="26"
                      className="profile__logo"
                    />
                  </span>
                </td>
                <td className="p-2 border">{crypto.code}</td>
                <td className="p-2 border">
                  <span className="profile__name">
                    <a href={`/coin/${crypto.code}`} className="profile__link">
                      {crypto.name}
                    </a>
                  </span>
                </td>
                <td className="p-2 border">{crypto.price}</td>
                <td className="p-2 border">{crypto.marketCap}</td>
                <td className={`p-2 border ${crypto.change24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {crypto.change24h}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
