import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from '../provider/SocketProvider';

const NotificationComponent = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Client connected to the server');
      });

      // Listen for 'notification' events
      socket.on('notification', (data) => {
        // Update state to trigger a re-render
        // setNotifications((prevNotifications) => [data.message, ...prevNotifications.length > 100 ? prevNotifications.slice(10):prevNotifications]);

        // Display a toast notification
        toast.info(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000, // Auto-close after 5 seconds
        });
      });

      // Listen for 'welcome' event from the server
      socket.on('welcome', (message) => {
        console.log('Server says:', message);
      });

      return () => {
        // Disconnect from the Socket.IO server when component unmounts
        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default NotificationComponent;
