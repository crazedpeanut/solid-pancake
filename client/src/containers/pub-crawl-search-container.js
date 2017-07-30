import {connect} from 'react-redux'
import PubCrawlSearch from '../components/pub-crawl-search'
import {withRouter} from 'react-router';

const mapPubCrawlStateToProps = (state, ownProps) => {
    return {
        pubCrawls: state.PubCrawls.pubCrawls
    }
};

const PubCrawlSearchContainer = withRouter(connect(
    mapPubCrawlStateToProps,
)(PubCrawlSearch));

export default PubCrawlSearchContainer;
