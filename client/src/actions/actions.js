export const REFRESH_PUBCRAWLS = 'REFRESH_PUBCRAWLS';
export const REFRESH_PUBCRAWL = 'REFRESH_PUBCRAWL';
/*
 * action creators
 */

export function refreshPubCrawls(pubCrawls) {
    return { type: REFRESH_PUBCRAWLS, pubCrawls}
}
export function refreshPubCrawlDisplay(pubCrawl) {
    return { type: REFRESH_PUBCRAWL, pubCrawl}
}