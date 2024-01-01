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
    var TLEList = [
      {
        name: "SOSO-1",
        TLE: `1 00001U          23274.66666667  .00000000  00000-0  00000-0 0 00001
        2 00001 097.3597 167.6789 0009456 299.5645 340.3650 15.25701051000010`,
      },
      {
        name: "SOSO-2",
        TLE: `1 00002U          23274.66666667 -.00000000  00000-0  00000-0 0 00003
        2 00002 097.4451 167.7017 0017417 313.0688 199.0918 15.16151277000016`,
      },
    ];
    // Grant CesiumJS access to your ion assets
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YzBhYjY5Mi01ODcxLTQ0M2YtYmI4My0yYWVkZjUyN2ExYTYiLCJpZCI6MTg0OTkwLCJpYXQiOjE3MDI4NjIwNTV9.b7PQwqto5A95Kmc8oCoe1FiaWI1j6GE7X3BseHZLaIU";
    var viewer = new Cesium.Viewer("cesiumContainer2D", {
      selectionIndicator: false,
      fullscreenButton: false,
      geocoder: false,
      navigationHelpButton: false,
      selectionIndicator: false,
      infoBox: false,
      homeButton: false,
      sceneModePicker: false,
      shouldAnimate: true,
    });
    var baseLayerPickerViewModel = viewer.baseLayerPicker.viewModel;
    baseLayerPickerViewModel.selectedImagery =
      baseLayerPickerViewModel.imageryProviderViewModels[3];
    document.getElementsByClassName("cesium-viewer-bottom")[0].remove();
    viewer.baseLayerPicker.container.style.visibility = "hidden";
    var globe = viewer.scene.globe;
    var scene = viewer.scene;
    viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    function ShowStationList() {
      for (const station of StationList) {
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
            image: "./images/satellite.svg",
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
      for (const TLEObj of TLEList) {
        var satrec = satellite.twoline2satrec(
          TLEObj.TLE.split("\n")[0].trim(),
          TLEObj.TLE.split("\n")[1].trim()
        );
        // Give SatelliteJS the TLE's and a specific time.
        // Get back a longitude, latitude, height (km).
        // We're going to generate a position every 10 seconds from now until 6 seconds from now.
        var totalSeconds = 60 * 60 * 6;
        var timestepInSeconds = 10;
        var start = Cesium.JulianDate.fromDate(new Date());
        var stop = Cesium.JulianDate.addSeconds(
          start,
          totalSeconds,
          new Cesium.JulianDate()
        );
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.timeline.zoomTo(start, stop);
        viewer.clock.multiplier = 40;
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

        var positionsOverTime = new Cesium.SampledPositionProperty();
        for (let i = 0; i < totalSeconds; i += timestepInSeconds) {
          var time = Cesium.JulianDate.addSeconds(
            start,
            i,
            new Cesium.JulianDate()
          );
          var jsDate = Cesium.JulianDate.toDate(time);

          var positionAndVelocity = satellite.propagate(satrec, jsDate);
          var gmst = satellite.gstime(jsDate);
          const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

          var position = Cesium.Cartesian3.fromRadians(
            p.longitude,
            p.latitude,
            p.height * 1000
          );
          positionsOverTime.addSample(time, position);
        }

        // Visualize the satellite with a red dot.
        var satellitePoint = viewer.entities.add({
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop,
            }),
          ]),
          label: {
            text: TLEObj.name,
            showBackground: true,
            font: "14px 'Roboto', sans-serif",
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            pixelOffset: new Cesium.Cartesian2(0, 2),
          },
          position: positionsOverTime,
          billboard: {
            show: true,
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVDhPnZHRDcMgEEMZjVEYpaNklIzSEfLfD4qNnXAJSFWfhO7w2Zc0Tf9QG2rXrEzSUeZLOGm47WoH95x3Hl3jEgilvDgsOQUTqsNl68ezEwn1vae6lceSEEYvvWNT/Rxc4CXQNGadho1NXoJ+9iaqc2xi2xbt23PJCDIB6TQjOC6Bho/sDy3fBQT8PrVhibU7yBFcEPaRxOoeTwbwByCOYf9VGp1BYI1BA+EeHhmfzKbBoJEQwn1yzUZtyspIQUha85MpkNIXB7GizqDEECsAAAAASUVORK5CYII=",
            scale: 1.5,
          },
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW,
            }),
            width: 10,
          },
        });
      }
    }
    RenderSatelliteData();
    ShowStationList();
  }, []);
  return (
    <React.Fragment>
      <div className="viewerHeader">2D Map</div>
      <div id="cesiumContainer2D"></div>
    </React.Fragment>
  );
}

export default Viewer2D;
