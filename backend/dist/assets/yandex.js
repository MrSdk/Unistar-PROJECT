 let PlaceMarkers = []

 let myMap;

 function setMapOptions(center) {

     ymaps.ready(() => {

         myMap = new ymaps.Map("map-another", {

             center: center,

             zoom: 7
         });

     });
 }

 // function update(aaa) {
 //     myMap.panTo(aaa)
 // }


 function setSecondOpt(subIndex, center) {
     ymaps.ready(init);

     function init() {

         var data = {
                 balloonContent: subIndex,
                 // hintContent: 'Placemark',
                 // iconContent: '2'
             },
             options = {
                 preset: 'islands#redDotIcon',
                 balloonHasCloseButton: true,
                 //  iconLayout: 'default#image',

                 //  iconImageHref: 'assets/icon.png',

                 //  iconImageSize: [40, 56],

                 //  iconImageOffset: [-5, -38]
             },
             myPlacemark = new ymaps.Placemark(center, data, options);


         myMap.geoObjects.add(myPlacemark);
         PlaceMarkers.push(myPlacemark)

         // console.log(PlaceMarkers);

     }
 }

 function updatePlaceMark(i) {
     let thismyPlaceMark = PlaceMarkers[i]
     thismyPlaceMark.geometry._coordinates = [thismyPlaceMark.geometry._coordinates[0] + 0.5, thismyPlaceMark.geometry._coordinates[1] - 0.5]
     console.log(thismyPlaceMark.geometry._coordinates);
     myMap.geoObjects.add(thismyPlaceMark);

 }

 // function getMarkers() {
 //     return PlaceMarkers;
 // }

 module.exports = { setMapOptions, setSecondOpt, updatePlaceMark }