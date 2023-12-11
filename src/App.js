import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoList from './component/CryptoList';
import Watchlist from './component/WatchList';
import CryptoSearch from './component/CryptoSeach';
import NotificationComponent from './component/Notification';
import { SocketProvider } from './provider/SocketProvider';

function App() {

  return (

    <div>
      <SocketProvider>
      <NotificationComponent />
        <Routes>
          <Route path="/" element={<CryptoList />} />
          <Route path="/watch-list" element={<Watchlist />} />
          <Route path="/search-list" element={<CryptoSearch />} />
        </Routes>
        <ToastContainer />
      </SocketProvider>


    </div>
  );
}

export default App;
