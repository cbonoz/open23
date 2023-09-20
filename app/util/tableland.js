import { Database } from "@tableland/sdk";
import { APP_NAME } from "./constant";
import { ethers } from "ethers";

// Create a database connection; since there is no signer,
// table reads are possible but creates/writes are not
const LISTING_TABLE = process.env.NEXT_PUBLIC_LISTING_TABLE;
const OFFER_TABLE = process.env.NEXT_PUBLIC_OFFER_TABLE;

const db = new Database();

// This is the table's `prefix`--a custom table value prefixed as part of the table's name

export const setupTables = async () => {
    // Setup bid/ask tables and dataset links.
    const prefix = APP_NAME.toLowerCase();
    const listingTableName = `${prefix}_listings`
    const offerTableName = `${prefix}_offers`

    const { meta: createListing } = await db
        .prepare(`CREATE TABLE ${listingTableName} (id integer primary key, name text, created_by text, 
            created_at integer, image text, description text, purchases integer, price integer, address text);`)
        .run();

    const { meta: createOffer } = await db
        .prepare(`CREATE TABLE ${offerTableName} (id integer primary key, offer integer, created_by text, created_at integer, listing_id integer);`)
        .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    const { name: listingTable } = createListing.txn; // e.g., my_sdk_table_80001_311\
    const { name: offerTable } = createOffer.txn; // e.g., my_sdk_table_80001_311\
    console.log('setup', listingTable, offerTable)
    return { listingTable, offerTable };
}

export const getListings = async (offset, limit) => {
    const { results } = await db.prepare(`SELECT * FROM ${LISTING_TABLE} limit ${limit} offset ${offset};`).all();
    return results;
}

export const createListing = async (listing) => {
    const priceWei = ethers.utils.parseEther(listing.price.toString()).toString()
    console.log('create', listing, priceWei)
    const { meta: insert } = await db.prepare(`insert into ${LISTING_TABLE} (name, created_by, created_at, image, description, purchases, price, address) values (?, ?, ?, ?, ?, ?, ?, ?);`)
        .bind(listing.name, listing.createdBy, listing.createdAt, listing.image, listing.description, listing.purchases, priceWei, listing.address)
        .run();
    console.log('created', insert);
    return await insert.txn.wait();
}

export const createOffer = async (offer) => {
    const priceWei = ethers.utils.parseEther(offer.offer.toString()).toString();
    const { meta: insert } = await db.prepare(`insert into ${OFFER_TABLE} (offer, created_by, created_at, listing_id) values (?, ?, ?, ?);`)
        .bind(priceWei, offer.createdBy, offer.createdAt, offer.listingId)
        .run();
    return await insert.txn.wait();

}

export const getOffersForListing = async (listingId) => {
    const { results } = await db.prepare(`SELECT * FROM ${OFFER_TABLE} where listing_id=?;`)
        .bind(listingId)
        .all();
    return results;
}
