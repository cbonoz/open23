import { Database, Registry } from "@tableland/sdk";
import { ethers } from "ethers";
import { APP_NAME, LISTING_TABLE, OFFER_TABLE } from "../constants";
import { deployPolicy } from "./listingContract";

// Create a database connection; since there is no signer,
// table reads are possible but creates/writes are not
const db = new Database({ autoWait: true });

// This is the table's `prefix`--a custom table value prefixed as part of the table's name

export const setupTables = async (signer) => {
    if (!signer) {
        alert('Please connect wallet')
        return
    }
    let listingTable;
    let offerTable;
    if (!LISTING_TABLE || !OFFER_TABLE) {
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
        listingTable = createListing.txn.name;
        offerTable = createOffer.txn.name;
        // const { name: listingTable } = createListing.txn; // e.g., my_sdk_table_80001_311\
        // const { name: offerTable } = createOffer.txn; // e.g., my_sdk_table_80001_311\
    } else {
        listingTable = LISTING_TABLE;
        offerTable = OFFER_TABLE;
    }

    const signerDb = new Database({ signer, autoWait: false });
    const reg = new Registry(signerDb.config);

    const policyContract = await deployPolicy(signer);

    let tx;
    tx = await reg.setController({
        controller: policyContract.address,
        tableName: offerTable
    });
    await tx.wait();
    console.log('set controller', tx);

    tx = await reg.setController({
        controller: policyContract.address,
        tableName: listingTable
    });
    await tx.wait();
    console.log('set controller', tx);

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

export const addPurchase = async (signer, listingId) => {
    const signerDb = new Database({ signer, });
    const { meta: update } = await signerDb.prepare(`update ${LISTING_TABLE} set purchases=purchases+1 where address=?;`)
        .bind(listingId)
        .run();
    return await update.txn.wait();
}

export const verifyListing = async (signer, listingId) => {
    const signerDb = new Database({ signer, });
    const { meta: update } = await signerDb.prepare(`update ${LISTING_TABLE} set verified=1 where address=?;`)
        .bind(listingId)
        .run();
    return await update.txn.wait();
}

export const createListing = async (signer, listing) => {
    const priceWei = ethers.utils.parseEther(listing.price.toString()).toString()
    console.log('create', listing, priceWei)
    const signerDb = new Database({ signer,  });
    const { meta: insert } = await signerDb.prepare(`insert into ${LISTING_TABLE} (name, verified, created_by, created_at, image, description, purchases, price, address) values (?, 0, ?, ?, ?, ?, ?, ?, ?);`)
        .bind(listing.name, listing.createdBy, listing.createdAt, listing.image, listing.description, listing.purchases, priceWei, listing.address)
        .run();
    console.log('created', insert);
    return await insert.txn.wait();
}

export const createOffer = async (signer, offer) => {
    const signerDb = new Database({ signer, });
    const priceWei = ethers.utils.parseEther(offer.amount.toString()).toString();
    const { meta: insert } = await signerDb.prepare(`insert into ${OFFER_TABLE} (amount, created_by, created_at, listing_id, address) values (?, ?, ?, ?, ?);`)
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
