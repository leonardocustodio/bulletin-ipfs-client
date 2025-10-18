# Bulletin and IPFS - Client template

This template has a slightly modified version of [polkadot-bulletin-chain](https://github.com/paritytech/polkadot-bulletin-chain) \
We have added the `sudo` pallet back so you can interact with the chain without People Chain and the bridge.

## Running IPFS locally

### 1. Install IPFS

For macOS, you can find the binary at [kubo/ipfs](./kubo/ipfs):

> You must use Kubo 0.36.0 at this moment, DO NOT install the latest version

### 2. Initialize IPFS 

```bash
ipfs init
```

### 3. Start IPFS daemon

Run this command in another terminal window:

```bash
IPFS_TELEMETRY=off ipfs daemon
```

## Running Bulletin Chain locally

### 1. Install Polkadot-SDK dependencies

Platform specific instructions can be found at: https://docs.polkadot.com/develop/parachains/install-polkadot-sdk

### 2. Setup toolchain

Make sure your Rust is updated and you have the toolchain necessary, for people running macOS:

```bash
rustup default stable
rustup update
rustup update nightly
rustup target add wasm32v1-none --toolchain nightly
rustup component add rust-src --toolchain stable-aarch64-apple-darwin
```

Other platform specific instructions can be found at https://docs.polkadot.com/infrastructure/running-a-node/setup-full-node

### 3. Install ZombieNet

You can install it in multiple ways, including just downloading the binary, for the sake of simplicity let's use npm:

```bash
npm i @zombienet/cli@latest -g
```

### 4. Compile the chain and start ZombieNet

There is a convenience script in the root directory that you can just run:

```bash
./start.sh
```

### 5. Take note of the boot node address

When running the above script you will see in the terminal something like:

```bash
Polkadot Bulletin Local Testnet ⚙ Added Boot Nodes                                                                     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ /ip4/127.0.0.1/tcp/10001/ws/p2p/12D3KooWQCkBm1BYtkHpocxCwMgR8yjitEeHGx8spzcDLGt2gkBm            
```

You should take note of that as that will be needed in future steps.

## IPFS configuration

### 1. Connect our daemon to bulletin

In another terminal, connect our daemon to the bulletin ipfs server:

```bash
ipfs swarm connect <THE_ADDRESS_ABOVE>

Example:
ipfs swarm connect /ip4/127.0.0.1/tcp/10001/ws/p2p/12D3KooWQCkBm1BYtkHpocxCwMgR8yjitEeHGx8spzcDLGt2gkBm
```


## Storing

### 5. Storing at bulletin chain

Run the script at ipfs-client

```js
npm install
node main.js
```

### 2. Retrieve the data you have stored previously

Through Kubo-CLI:

```bash
ipfs block get <CID_HERE>
```

Through a public gateway:

https://dweb.link/ipfs/<CID_HERE>

Or through our local ipfs node gateway:

