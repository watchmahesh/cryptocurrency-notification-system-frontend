import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const CryptoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [watchlistPayload, setWatchlistPayload] = useState({
    code: '',
    minPrice: 0,
    maxPrice: 0,
  });
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        toast.error('Search field should not be empty');
        return;
      }
      const response = await api.get(`/crypto/list?keyword=${searchTerm}`);
      if (response.data.data.length === 0) {
        const errorMessage = 'Data not found';
        toast.error(errorMessage);
      }
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching for cryptocurrencies:', error);
    }
  };

  const handleAddToWatchlist = async (crypto) => {
    // Update the payload with the selected cryptocurrency's code, minPrice, and maxPrice
    setWatchlistPayload({
      ...watchlistPayload,
    });
    try {
      // Call the onAddToWatchlist function with the updated payload
      const response = await api.post('/watchlist/add', { ...watchlistPayload, code: crypto.code });
      if (response.data.status === 200) {
        // Display success toast message
        const successMessage = response.data.message;
        toast.success(successMessage);

        // Clear the search term and results
        setSearchTerm('');
        setSearchResults([]);

        // Navigate to the watchlist section after a successful addition
        navigate('/watch-list');
      } else {
        // Display error toast message
        const errorMessage = response.data.message || 'Failed to add to watchlist';
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error adding to watchlist';
      toast.error(errorMessage);
      console.error('Error adding to watchlist:', error);
    }
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Crypto And AddToWatchList</h2>
        </div>
        <div className="flex space-x-3">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => navigate('/')}
          ><FontAwesomeIcon icon={faEye} className="mr-2" />
            View Cryptocurrency
          </button>
          <button
            className="bg-green-500 text-white p-2"
            onClick={() => navigate('/watch-list')}
          >
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            View WatchList
          </button></div>

      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          required="required"
          placeholder="Search for cryptocurrencies"
          className="p-2 border mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Min Price</th>
                <th className="p-2 border">Max Price</th>
                <th className="p-2 border">Add to Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((crypto, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="p-2 border">{crypto.code}</td>
                  <td className="p-2 border">{crypto.name}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      placeholder="Min Price"
                      min="0"
                      value={watchlistPayload.minPrice}
                      onChange={(e) => setWatchlistPayload({ ...watchlistPayload, minPrice: e.target.value })}
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      placeholder="Max Price"
                      min='1'
                      value={watchlistPayload.maxPrice}
                      onChange={(e) => setWatchlistPayload({ ...watchlistPayload, maxPrice: e.target.value })}
                    />
                  </td>
                  <td className="p-2 border">
                    <button className="bg-green-500 text-white p-2" onClick={() => handleAddToWatchlist(crypto)}>
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoSearch;
