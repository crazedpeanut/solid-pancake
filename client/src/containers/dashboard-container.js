import {connect} from 'react-redux'
import DashboardComponent from '../components/dashboard-component'
import {refreshPubCrawls} from '../actions/actions';
import {withRouter} from 'react-router';

const mapDispatchToProps = dispatch => {
    return {
        onRefreshPubCrawls: pubCrawls => {
            dispatch(refreshPubCrawls(pubCrawls))
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        pubCrawls: state.PubCrawls.pubCrawls
    }
};

const DashboardContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent));

export default DashboardContainer;