const React = require('react');

let map, service;

function initMap(pub) {
    console.log('pub: '+pub.PubID);
    console.log(getPubDivID('map' + pub.PubID));
    console.log(document.getElementById(getPubDivID('map' + pub.PubID)));

    map = new google.maps.Map(document.getElementById(getPubDivID('map' + pub.PubID)), {
        center: {lng: pub.Xcoordinate, lat: pub.Ycoordinate},
        zoom: 15
    });

    const request = {
        location: {lng: pub.Xcoordinate, lat: pub.Ycoordinate},
        radius: "500",
        types: ["food"]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, searchResult.bind(null, getPubDivID(pub.PubID)));
}

function searchResult(pubDivId, results, status) {
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
                console.log(`Query select #${pubDivId} .rating`);
                let rating = document.querySelector(`#${pubDivId} .rating`);
                let reviewEl = document.querySelector(`#${pubDivId} .review-list`);

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
                    <hr/>
                    <div><strong>Overall rating:</strong> <span id="rating"> </span></div>
                    </div>
                    <div className="ui row">
                        <div className="ui eight wide column">
                            <div><strong>Overall rating:</strong> <span className="rating"></span></div>
                            <div className="reviews"><ul className="review-list"></ul></div>
                        </div>
                        <div className="ui eight wide column">
                            <div className="pubmap" id={getPubDivID('map' + this.props.pub.PubID)}/>
                        </div>
                    </div>
                <hr/>
            </div>
        
        );
    }

    componentDidMount() {
        initMap(this.props.pub)
    }
}

module.exports = PubCrawlPubComponent;