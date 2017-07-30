const React = require('react');
const pubCrawlService = require('../services/pub-crawl-service');
const queryString = require('query-string');
const PubCrawlPubComponent = require('./pubcrawl-pub-component');


function pubCrawlPubList(pubs) {
    if(pubs)
        return pubs.map(pub =>
            <PubCrawlPubComponent key={pub.Index} pub={pub}/>
        );
}

let map, service;

function initMap() {
    const central_park = new google.maps.LatLng(40.764243, -73.973049);

    map = new google.maps.Map(document.getElementById("map"), {
        center: central_park,
        zoom: 15
    });

    const request = {
        location: central_park,
        radius: "500",
        types: ["food"]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, searchResult);
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


class PubCrawlDisplay extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);

        console.log('Pub crawl Display loaded');
        console.log('ID: '+parsed.id);
        pubCrawlService.getPubCrawl(parsed.id)
            .then(pubCrawl => {
                console.log('Got the pub crawl' + JSON.stringify(pubCrawl));
                this.props.onRefreshPubCrawlDisplay(pubCrawl);
            })
            .catch(err => console.error(err));
    }

    render() {
        let crawl = this.props.pubCrawlDisplay;
        console.log(crawl);
        return (
            <div className="ui grid centered container viewPubCrawl">
                <div className="ui twenty wide column">

                    <div className="seven wide column">
                        <div className="ui huge header">{crawl.PubCrawlName}</div>
                        <div>
                            By {crawl.UserID}
                            <i className="large star icon"> </i>
                            <i className="large star icon"> </i>
                            <i className="large star icon"> </i>
                            <i className="large star half empty icon"> </i>
                            <i className="large empty star icon"> </i>
                        </div>
                        {pubCrawlPubList(crawl.PubCrawlItem)}
                    </div>
                </div>
                {initMap()}
            </div>
        )
    }
}

module.exports = PubCrawlDisplay;