export const REFRESH_PUBCRAWLS = 'REFRESH_PUBCRAWLS';

/*
 * action creators
 */

export function refreshPubCrawls(pubCrawls) {
    return { type: REFRESH_PUBCRAWLS, pubCrawls}
}