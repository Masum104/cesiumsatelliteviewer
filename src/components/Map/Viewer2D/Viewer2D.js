import React, { useEffect } from "react";

function Viewer2D() {
  useEffect(() => {
    var StationList = [
      {
        lat: 68.3195,
        lon: -133.549,
        height: 102.5,
        name: "Inuvik Northwest Territories",
      },
      {
        lat: 53.2124,
        lon: -105.934,
        height: 490.3,
        name: "Prince Albert Saskatchewan",
      },
      {
        lat: 45.5846,
        lon: -75.8083,
        height: 240.1,
        name: "Gatineau Quebec",
      },
    ];
    // Grant CesiumJS access to your ion assets
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YzBhYjY5Mi01ODcxLTQ0M2YtYmI4My0yYWVkZjUyN2ExYTYiLCJpZCI6MTg0OTkwLCJpYXQiOjE3MDI4NjIwNTV9.b7PQwqto5A95Kmc8oCoe1FiaWI1j6GE7X3BseHZLaIU";
    var viewer = new Cesium.Viewer("cesiumContainer2D", {
      selectionIndicator: false,
      fullscreenButton: false,
      //geocoder: false,
      navigationHelpButton: false,
      selectionIndicator: false,
      infoBox: false,
      homeButton: false,
      sceneModePicker: false,
      shouldAnimate: true,
    });
    viewer._cesiumWidget._creditContainer.style.display = "none";
    var globe = viewer.scene.globe;
    var scene = viewer.scene;
    viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    function ShowStationList() {
      for(const station of StationList){
        var entity = viewer.entities.add({
          name: station.name,
          position: Cesium.Cartesian3.fromDegrees(
            station.lon,
            station.lat,
            station.height
          ),
          label: {
            text: station.name,
            showBackground: true,
            font: "14px 'Roboto', sans-serif",
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            pixelOffset: new Cesium.Cartesian2(-50, -30),
          },
          billboard: {
            show: true,
            image: './images/satellite.svg',
            width: 32,
            height: 32,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            pixelOffset: new Cesium.Cartesian2(-10, -7),
          },
        });
      }
    }
    
    function RenderSatelliteData() {
      const totalSeconds = 60 * 60 * 24;
      const timestepInSeconds = 10;
      const start = Cesium.JulianDate.fromDate(new Date());
      const stop = Cesium.JulianDate.addSeconds(
        start,
        totalSeconds,
        new Cesium.JulianDate()
      );
      viewer.clock.startTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.currentTime = start.clone();
      viewer.timeline.zoomTo(start, stop);
      viewer.clock.multiplier = 5;
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    
      var dataSourcePromise = viewer.dataSources.add(
        Cesium.CzmlDataSource.load("data/orbit.czml")
      );
    
      dataSourcePromise.then(function (dataSource) {
        //Get the array of entities
        var entities = dataSource.entities.values;
    
        var TLE_entities = entities;
        for (var i = 0; i < TLE_entities.length; i++) {
          //TLE_entities[i].path.show = false
        }
      });
    }
    RenderSatelliteData();
    ShowStationList();

  }, []);
  return (
    <React.Fragment>
    <div className="viewerHeader">2D Map</div>
    <div id="cesiumContainer2D"></div>
  </React.Fragment>
  )
}

export default Viewer2D;
