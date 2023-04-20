import React, { useEffect, useState } from 'react'

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Récupération des notifications depuis l'API
        fetch('http://localhost:8000/notifications/getAllNotifications')
          .then(response => response.json())
          .then(data => setNotifications(data));
      }, []);
  return (
   <div>
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification._id}>
          <p>{notification.text}</p>
          <p>Related donation: {notification.related_donation}</p>
          <p>Read: {notification.read ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>

  )
}

export default Notifications
