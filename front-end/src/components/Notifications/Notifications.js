import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
    
  useEffect(() => {
    // Récupération des notifications depuis l'API, en incluant les données de la relation related_donation
    fetch('http://localhost:8000/notifications/getAllNotifications?populate=related_donation')
      .then(response => response.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <Navbar notifications={notifications}/>
      {notifications.map(notification => (
        <div key={notification._id}>
          <p>{notification.text}</p>
          <p>Related donation: {notification.related_donation.sector}</p>
          <p>Related donation: {notification.related_donation.location}</p>
          <p>Related donation: {notification.related_donation.type}</p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;