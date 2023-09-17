import { ethers } from "ethers";
import { DATA_CONTRACT} from "./metadata";

export async function deployContract(signer, cid, price) {
    // Deploy contract with ethers
    const factory = new ethers.ContractFactory(
        DATA_CONTRACT.abi,
        DATA_CONTRACT.bytecode,
        signer
    );
    const contract = await factory.deploy(cid, price);
    // log
    console.log("Deploying contract...", cid, price);
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    return contract;
}

export async function purchaseContract(signer, contractAddress, price) {
    // Deploy contract with ethers
    const contract = new ethers.Contract(
        contractAddress,
        DATA_CONTRACT.abi,
        signer
    );
    // log
    const tx = await contract.purchase({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    return tx;
}