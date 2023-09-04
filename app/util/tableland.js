import { Database } from "@tableland/sdk";
import { APP_NAME } from "./constant";

// Create a database connection; since there is no signer,
// table reads are possible but creates/writes are not


// This is the table's `prefix`--a custom table value prefixed as part of the table's name

export const setupTables = async () => {
    const db = new Database();
    // Setup bid/ask tables and dataset links.
    const prefix = APP_NAME.toLowerCase();

    const { meta: create } = await db
    .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
    .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    const { name } = create.txn; // e.g., my_sdk_table_80001_311\
    console.log('setup', create)
}

export const getListings = async (offset, limit) => {
    return []

}

export const searchListings = async () => {

}

export const createListing = async (listing) => {

}

export const createOffer = async (offer) => {

}

export const getListingWithOffers = async (listingId) => {

}

export const acceptOffer = async (offerId) => {

}