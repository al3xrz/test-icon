import L, { icon, latLng } from "leaflet";
import "../node_modules/leaflet/dist/leaflet.css";
import "./index.css";

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const testMarker = L.circleMarker([51.5, -0.09], {
  color: "red",
  fillColor: "red",
  opacity: 1,
  // radius : '24px'
});

testMarker.addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

// const testMarker2 = L.marker([51.5, -0.09],{
//     draggable: true,
//     icon : L.divIcon({
//         className :"my-icon",

//         iconSize: [32, 32],
//         html : `
//             <div>
//             42
//             </div>

//         `
//     })
// })

// testMarker2.addTo(map)

class MyMarker extends L.Marker {
  constructor(latLng, options = {}) {
    super(latLng, options);
    this.problemLevel = options.problemLevel;
    this.fixations = options.fixations;
    this.setIcon(
      L.divIcon({
        className: "my-icon",
        iconSize: [42, 42],
        html: `
                            <div>
                            ${Number(this.fixations)}
                            </div>
                        `,
      })
    );
  }

  setState(fixations, problemLevel) {
    this.fixations = fixations;
    this.problemLevel = problemLevel;
    const html = `
            <div>
            ${Number(this.fixations)}
            </div>
    `;
    const className = `my-icon my-icon-${problemLevel} ${
      fixations > 9999 ? "my-icon-small-font" : ""
    }`;
    
    this.setIcon(
      L.divIcon({
        className,
        iconSize: [42, 42],
        html,
      })
    );
  }
}

const myMarker = new MyMarker([51.5, -0.09], { fixations: 0 });

myMarker.addTo(map);
myMarker.bindTooltip("test", {
  permanent: true,
  direction: "top",
  offset: [0, -21],
});

let counter = 9998;
setInterval(() => {
  counter++;
  const problemLevel = (Math.random() * 5).toFixed();

  console.log(problemLevel);
  myMarker.setState(counter, problemLevel);
}, 1000);
