import { IPFS_BASE_URL, ACTIVE_CHAIN, ADMIN_ADDRESS } from '../constants'
import { ethers } from 'ethers'

export function addMinutes(numOfMinutes, date = new Date()) {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

export const abbreviate = s => s ? `${s.substr(0, 6)}**` : ''

export const formatDate = (d) => {
  if (!(d instanceof Date)) {
    d = d ? new Date(d) : new Date()
  }
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const isAdminAddress = (address) => {
  return ADMIN_ADDRESS === address;
}

export const formatCurrency = (amount, symbol) => {
  if (amount === 0) {
    return 'Free'
  } else if (!amount) {
    return ''
  }
  return `${amount} ${symbol || ACTIVE_CHAIN.symbol}`
}

export const ipfsUrl = (cid, fileName) => {
  // let url = `https://ipfs.io/ipfs/${cid}`;
  let url = `${IPFS_BASE_URL}/${cid}`
  if (fileName) {
    return `${url}/${fileName}`;
  }
  return url;
};

export const listingUrl = (listingId) => `${window.location.origin}/listing/${listingId}`;

export const convertCamelToHuman = (str) => {
  // Check if likely datetime timestamp ms
  if (str.length === 13) {
    return new Date(str).toLocaleDateString();
  }

  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    }).replace(/_/g, ' ');
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getExplorerUrl = (hash, useTx) =>
  `${ACTIVE_CHAIN.explorerUrl}${useTx ? "tx/" : "address/"}${hash}${ACTIVE_CHAIN.id === 31415 ? '?network=wallaby' : ''}`;

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const col = (k, render) => ({
  title: capitalize(k).replaceAll('_', ' '),
  dataIndex: k,
  key: k,
  render,
});

export const isEmpty = (r) => {
  return !r || r.length === 0
}

export const humanError = message => {
  if (message.indexOf('404') !== -1) {
    message = 'Dataset not found. Do you have the correct url? Otherwise, try creating a new dataset.'
  } else if (message.indexOf('network changed') !== -1) {
    message = 'Network changed since page loaded, please refresh.'
  }
  return message
}

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

export const formatListing = (listing) => {
  if (!listing) return {}
  return {
    ...listing,
    // shortAddress: abbreviate(listing.address),
    created_by: abbreviate(listing.created_by),
    created_at: formatDate(listing.created_at),
    price: formatCurrency(ethers.utils.formatEther(listing.price + ""), ACTIVE_CHAIN.symbol),
    verified: listing.verified ? 'Verified' : 'Unverified',

  }
}