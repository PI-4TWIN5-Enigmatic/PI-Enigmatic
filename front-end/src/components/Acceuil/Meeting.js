import * as React from 'react';

import { Link } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useCookies } from 'react-cookie';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars =
    '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Meeting() {
  const [cookies, setCookies] = useCookies(['roomID']);

  // Retrieve the room ID from local storage or generate a new one
  const roomID = localStorage.getItem('roomID') || randomID(5);
  localStorage.setItem('roomID', roomID);
  setCookies('roomID', roomID);

  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }

  // Generate the audience link using the room ID
  const audienceLink = `${window.location.protocol}//${window.location.host}/stream?roomID=${roomID}&role=Audience`;
  sharedLinks.push({
    name: 'Join as audience',
    url: audienceLink,
  });

  // Generate Kit Token
  const appID = 1456019005;
  const serverSecret = '45a02972fc23a0c7b150ea30b36253cf';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  // start the call
  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  };

  return (
    <>
       <div
    className="myCallContainer"
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh' }}
  ></div>

      </>)}
