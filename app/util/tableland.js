import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
import { APP_NAME } from "../constants";

// Create a database connection; since there is no signer,
// table reads are possible but creates/writes are not
const LISTING_TABLE = process.env.NEXT_PUBLIC_LISTING_TABLE;
const OFFER_TABLE = process.env.NEXT_PUBLIC_OFFER_TABLE;

const db = new Database({autoWait: false});

// This is the table's `prefix`--a custom table value prefixed as part of the table's name

export const setupTables = async () => {
    // Setup bid/ask tables and dataset links.
    const prefix = APP_NAME.toLowerCase();
    const listingTableName = `${prefix}_listings`
    const offerTableName = `${prefix}_offers`

    const { meta: createListing } = await db
        .prepare(`CREATE TABLE ${listingTableName} (id integer primary key, verified integer, name text, created_by text, 
            created_at integer, image text, description text, purchases integer, price integer, address text);`)
        .run();

    const { meta: createOffer } = await db
        .prepare(`CREATE TABLE ${offerTableName} (id integer primary key, amount integer, created_by text, created_at integer, listing_id integer, address text);`)
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

export const getListing = async (listingId) => {
    const { results } = await db.prepare(`SELECT * FROM ${LISTING_TABLE} where address='${encodeURIComponent(listingId)}'`).all();
    return results;
}

export const addPurchase = async (listingId) => {
    const { meta: update } = await db.prepare(`update ${LISTING_TABLE} set purchases=purchases+1 where address=?;`)
        .bind(listingId)
        .run();
    return await update.txn.wait();
}

export const verifyListing = async (listingId) => {
    const { meta: update } = await db.prepare(`update ${LISTING_TABLE} set verified=1 where address=?;`)
        .bind(listingId)
        .run();
    return await update.txn.wait();
}

export const createListing = async (listing) => {
    const priceWei = ethers.utils.parseEther(listing.price.toString()).toString()
    console.log('create', listing, priceWei)
    const { meta: insert } = await db.prepare(`insert into ${LISTING_TABLE} (name, verified, created_by, created_at, image, description, purchases, price, address) values (?, 0, ?, ?, ?, ?, ?, ?, ?);`)
        .bind(listing.name, listing.createdBy, listing.createdAt, listing.image, listing.description, listing.purchases, priceWei, listing.address)
        .run();
    console.log('created', insert);
    return await insert.txn.wait();
}

export const createOffer = async (offer) => {
    const priceWei = ethers.utils.parseEther(offer.amount.toString()).toString();
    const { meta: insert } = await db.prepare(`insert into ${OFFER_TABLE} (amount, created_by, created_at, listing_id, address) values (?, ?, ?, ?, ?);`)
        .bind(priceWei, offer.createdBy, offer.createdAt, offer.listingId, offer.address)
        .run();
    return await insert.txn.wait();

}

export const getOffersForListing = async (address) => {
    const { results } = await db.prepare(`SELECT * FROM ${OFFER_TABLE} where address=?;`)
        .bind(address)
        .all();
    return results;
}
