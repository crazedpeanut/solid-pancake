const _ = require('lodash');

const initialState = {
    pubCrawls: [],
    pubCrawlDisplay: []
};

export default function todoApp(state, action) {

    if (typeof state === 'undefined') {

        return initialState
    }

    if(action.type === 'REFRESH_PUBCRAWLS') {
        console.log('Got REFRESH_PUBCRAWLS action ');
        const newState = _.cloneDeep(state);
        newState.pubCrawls = action.pubCrawls;

        console.log(`Old state: ${JSON.stringify(state)}`);
        console.log(`newstate state: ${JSON.stringify(newState)}`);

        return newState;
    }

    if(action.type === 'REFRESH_PUBCRAWL') {
        console.log('Got REFRESH_PUBCRAWL action ');

        const newState = _.cloneDeep(state);
        newState.pubCrawlDisplay = action.pubCrawl;

        console.log(`Old state: ${JSON.stringify(state)}`);
        console.log(`newstate state: ${JSON.stringify(newState)}`);

        return newState;
    }

    if(action.type === '')

    return state
}