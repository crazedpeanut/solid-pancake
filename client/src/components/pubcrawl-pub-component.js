const React = require('react');

let map, service;

function initMap(pub) {
    const central_park = new google.maps.LatLng(40.764243, -73.973049);
    console.log('pub: '+pub.PubID);
    console.log(central_park);
    console.log(getPubDivID(pub.PubID));
    console.log(document.getElementById(getPubDivID(pub.PubID)));

    map = new google.maps.Map(document.getElementById(getPubDivID(pub.PubID)), {
        center: central_park,
        zoom: 15
    });

    const request = {
        location: central_park,
        radius: "500",
        types: ["food"]
    };

    //service = new google.maps.places.PlacesService(map);
    //service.nearbySearch(request, searchResult);
}

function searchResult(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // show first result on map and request for details
        const place = results[0];
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });
        const infowindow = new google.maps.InfoWindow({
            content: place.name
        });
        infowindow.open(map, marker);

        service.getDetails({placeId: place.place_id}, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let rating = document.querySelector('#rating');
                let reviewEl = document.querySelector('.review-list');

                rating.innerHTML = place.rating;

                for (let review of place.reviews){
                    let li = document.createElement('li');
                    li.innerHTML = `<div>Author: ${review.author_name}</div>
                          <em>${review.text}</em>
                          <div>Rating: ${review.rating} star(s)</div>`;
                    reviewEl.appendChild(li);
                }
            }
        });
    }
}


function getPubImg(name) {
    const val = (name.charCodeAt(0) % 3) + 1;

    return `/assets/img/PubIcon${val}.png`;
}

function getPubDivID(id) {
    return `pub${id}`;
}

class PubCrawlPubComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = props.onClick;
    }

    render() {
        return(

            <div id={getPubDivID(this.props.pub.PubID)}>
                <br/><br/>
                <div className="ui grid" id="pub1">
                    <div className="six wide column">
                        <div className="row ui medium header">{this.props.pub.ItemName}</div>
                        <div className="row">{this.props.pub.StreetAddress}</div>
                        <div className="row">Phone: 03 9123 4567</div>
                    </div>
                    <div className="two wide column">
                        <div className="row ui medium header"><br/></div>
                        <div className="row">Rating: 4/5</div>
                        <div className="row">Capacity: {this.props.pub.NumberOfPatrons}</div>
                    </div>
                    <div className="eight wide column">
                        <img className="ui image" src={getPubImg(this.props.pub.ItemName)} width="75px"/>
                    </div>
                    <div className="reviews"><ul className="review-list"></ul></div>
                    <div id="map"> </div>
                    <hr/>
                    <div><strong>Overall rating:</strong> <span id="rating"> </span></div>
                    </div>

                <div className="reviews"><ul className="review-list"></ul></div>
                <div id="map"></div>
                <hr/>
                <div><strong>Overall rating:</strong> <span id="rating"></span></div>
                {initMap(this.props.pub)}
            </div>
        
        );
    }
}

module.exports = PubCrawlPubComponent;