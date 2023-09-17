import { ethers } from "ethers";

async function deployContract(contractAddress, signer, name, description, cid, price, keywords) {
    // Deploy contract with ethers
    const factory = new ethers.ContractFactory(
        contractAddress,
        DATA_CONTRACT_ABI,
        signer
    );
    const contract = await factory.deploy();
    // log
    await contract.deployed();
    console.log("Deploying contract...", contract.address);
    return contract;
}

async function purchaseContract(signer, contractAddress, price) {
    // Deploy contract with ethers
    const contract = new ethers.Contract(
        contractAddress,
        DATA_CONTRACT_ABI,
        signer
    );
    // log
    const tx = await contract.purchase({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    return tx;
}