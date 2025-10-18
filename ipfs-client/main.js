import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, blake2AsU8a } from '@polkadot/util-crypto';
import { CID } from 'multiformats/cid';
import * as multihash from 'multiformats/hashes/digest';
import * as fs from "node:fs";

async function authorizeAccount(api, pair, who, transactions, bytes) {
    const tx = api.tx.transactionStorage.authorizeAccount(who, transactions, bytes);
    const sudo_tx = api.tx.sudo.sudo(tx);
    const result = await sudo_tx.signAndSend(pair);
    console.log('Transaction authorizeAccount result:', result.toHuman());
}

async function storeFile(api, pair, fileName) {
    console.log('Storing file:', fileName);
    const file = fs.readFileSync(fileName);
    const hash = blake2AsU8a(file)
    const mh = multihash.create(0xb220, hash);
    const cid = CID.createV1(0x55, mh);
    const txHash = await api.tx.transactionStorage.store('0x' + file.toString('hex')).signAndSend(pair);
    console.log('Transaction store result:', txHash.toHuman());
    return cid
}

async function store(api, pair, data) {
    console.log('Storing data:', data);

    // 1️⃣ Hash the data using blake2b-256
    const hash = blake2AsU8a(data)
    // 2️⃣ Wrap the hash as a multihash
    const mh = multihash.create(0xb220, hash); // 0xb220 = blake2b-256
    // 3️⃣ Generate CID (CIDv1, raw codec)
    const cid = CID.createV1(0x55, mh); // 0x55 = raw codec

    const tx = api.tx.transactionStorage.store(data);
    const result = await tx.signAndSend(pair);
    console.log('Transaction store result:', result.toHuman());
    return cid
}

async function main() {
    await cryptoWaitReady();

    const ws = new WsProvider('ws://localhost:10001');
    const api = await ApiPromise.create({ provider: ws });
    await api.isReady;

    const keyring = new Keyring({ type: 'sr25519' });
    const sudo_pair = keyring.addFromUri('//Alice');
    const who_pair = keyring.addFromUri('//Alice');

    // data
    const who = who_pair.address; // ✅ base58 string
    const transactions = 32;
    const bytes = 64 * 1024 * 1024; // 64 MB

    console.log('Doing authorization...');
    await authorizeAccount(api, sudo_pair, who, transactions, bytes);
    await new Promise(resolve => setTimeout(resolve, 8000));
    console.log('Authorized!');

    console.log('Storing data...');
    let cid = await storeFile(api, who_pair, 'photo.png');
    // let cid = await store(api, who_pair, Buffer.from(fs.readFileSync('photo.png')));
    console.log('Stored data with CID: ', cid);
    await new Promise(resolve => setTimeout(resolve, 5000));
}

main().catch(console.error);
