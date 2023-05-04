import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const MeetRoom = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {roomID}=useParams();
  console.log("🚀 ~ file: RoomPage.js:8 ~ RoomPage ~ roomID:", roomID)
  const myMeeting = async (element) => {
      // generate Kit Token
       const appID = 1247622317 ;
       const serverSecret = "89713d1e1ac411af134226d3c7e1038a";
       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString() ,"add user name");
       const zp = ZegoUIKitPrebuilt.create(kitToken);
       zp.joinRoom({
          container: element,
       scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      })
  }
  return (
   <>
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
   </>
  )
}

export default MeetRoom