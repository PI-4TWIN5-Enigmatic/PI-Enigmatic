import React , { useEffect } from 'react'
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletGeoCoder = (data) => {

    const map = useMap();
    useEffect(() => {
    L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on("markgeocode", function (e) {
          var latlng = e.geocode.center;
          L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
          map.fitBounds(e.geocode.bbox);
          data.onData(e.geocode.name);
        })
        .addTo(map);
        
    }, []);


    // map.on('click',(e)=>{
    //     L.marker([e.latlng.lat , e.latlng.lng]).addTo(map)
    //     console.log("e.latlng.lng:", e.latlng.lng)
    //     console.log(" e.latlng.lat:", e.latlng.lat)

    // })

    return null;
}

export default LeafletGeoCoder