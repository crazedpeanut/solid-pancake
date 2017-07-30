const React = require('react');
import PubSearch from './pub-search';
import PubSelector from './pub-selector';
import _ from 'lodash';
import {Button} from 'semantic-ui-react';
import classNames from 'classnames';
import pubCrawlService from '../services/pub-crawl-service';
import PubCrawlComponent from './pub-crawl-component';
import {Link} from 'react-router-dom';

class PubCrawlBuilder extends React.Component {

    constructor(props) {
        super(props);

        this.handlePubSelected = this.onPubSelected.bind(this);
        this.handlePubUp = this.onPubUp.bind(this);
        this.handlePubDown = this.onPubDown.bind(this);
        this.handlePubDeleted = this.onPubDeleted.bind(this);
        this.handleCancel = this.onCancel.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);

        this.state = {
            pubs: [],
            isSubmitting: false,
            pubCrawlUrl: null,
            pubCrawl: null,
        };
    }

    onCancel() {
        this.resetState();
    }

    onSubmit() {
        this.setState({
            isSubmitting: true
        });

        const pubCrawl = this.buildPubCrawl();

        pubCrawlService.submitPubCrawl(pubCrawl)
            .then(() => {
                this.setState({
                    isSubmitting: false,
                    pubCrawlUrl: `/pubCrawl?id=${pubCrawl.PubCrawlName}`,
                    pubCrawl
                });

                console.log('Sending user to pubCrawl');

                console.log('pub crawl submit Success!');

                console.log(JSON.stringify(pubCrawl));
            })
            .catch(err => {
                console.log(err);
            })
    }

    buildPubCrawl() {
        const pubs = this.state.pubs.map((pub) => ({
            ItemName: pub.TradingName,
            PubID: pub.PubID,
            Area: pub.Area,
            StreetAddress: pub.StreetAddress,
            NumberOfPatrons: pub.NumberOfPatrons
        }));

        for(let i = 0; i < pubs.length; i++) {
            pubs[i].Index = i;
        }

        return {
            UserID: document.getElementById('pubCrawlCurator').value,
            PubCrawlName: document.getElementById('pubCrawlName').value,
            PubCrawlItem: pubs
        }
    }

    onPubUp(pub) {
        const pubIndex = this.state.pubs.indexOf(pub);

        if(pubIndex < 1) return;

        const deletedPub = this.state.pubs.splice(pubIndex, 1);

        const newPubs = [...this.state.pubs];
        newPubs.splice(pubIndex - 1, 0, pub);

        this.setState({
            pubs: newPubs
        })
    }

    onPubDown(pub) {
        const pubIndex = this.state.pubs.indexOf(pub);

        if(pubIndex === -1 || pubIndex === this.state.pubs.index - 1) return;

        const deletedPub = this.state.pubs.splice(pubIndex, 1);

        const newPubs = [...this.state.pubs];
        newPubs.splice(pubIndex + 1, 0, pub);

        this.setState({
            pubs: newPubs
        })
    }

    onPubDeleted(pub) {
        const pubIndex = this.state.pubs.indexOf(pub);
        const newPubs = [...this.state.pubs];
        const deletedPub = newPubs.splice(pubIndex, 1);

        console.log(`Deleted pub: ${JSON.stringify(deletedPub)}`);

        this.setState({
            pubs: newPubs
        });
    }

    resetState() {
        this.setState({
            pubs: [],
            isSubmitting: false,
            pubCrawlUrl: null,
            pubCrawl: null,
        });
    }

    onPubSelected(newPub) {
        console.log('pub selected');

        if(_.find(this.state.pubs, (pub) => pub.PubID === newPub.PubID)) return;

        const pubs = [...this.state.pubs];
        pubs.push(newPub);

        this.setState({
            pubs
        })
    }

    render() {
        console.log('Rendering pub crawl builder');

        const submitClasses = classNames(
            'ui',
            'positive',
            'button',
            {
                'loading': this.state.isSubmitting,
            }
        );

        const successMessageClasses = classNames(
            'ui',
            'positive',
            'message',
            {
                'hidden': !this.state.pubCrawlUrl,
            }
        );

        return (
            <div className="ui grid centered container buildCrawlBuilder">
                <div className="ui eight wide column">
                    <div className={successMessageClasses}>
                        <i className="close icon"/>
                        <div className="header">
                            You created a Pub Crawl
                        </div>
                        <p>
                            {
                                this.state.pubCrawlUrl ? <Link to={this.state.pubCrawlUrl}>Take me there!</Link> : ''
                            }
                        </p>
                            {
                                <div className="ui items">
                                    {this.state.pubCrawl ? <PubCrawlComponent pubCrawl={this.state.pubCrawl}/> : 'no pub crawl'}
                                </div>
                            }
                    </div>
                    <PubSearch onSelected={this.handlePubSelected}/>
                    <PubSelector pubs={this.state.pubs} onDelete={this.handlePubDeleted} onUp={this.handlePubUp} onDown={this.handlePubDown}/>
                    <div className="pubcrawlField">
                        <div className="ui input">
                            <input id="pubCrawlName" type="text" placeholder="Pub Crawl Name"/>
                        </div>
                    </div>
                    <div className="pubcrawlField">
                        <div className="ui input">
                            <input id="pubCrawlCurator" type="text" placeholder="Pub Crawl Curator"/>
                        </div>
                    </div>
                    <div className="ui buttons">
                        <Button onClick={this.handleCancel} className="ui button">Cancel</Button>
                        <div className="or"/>
                        <Button onClick={this.handleSubmit} className={submitClasses}>Create</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PubCrawlBuilder;