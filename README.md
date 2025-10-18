# Bulletin and IPFS—Client template

This is based on the same instructions you can find at [README](./polkadot-bulletin-chain/examples/README.md)

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

Platform-specific instructions can be found at: https://docs.polkadot.com/develop/parachains/install-polkadot-sdk

### 2. Setup toolchain

Make sure your Rust is updated, and you have the toolchain necessary, the following is for macOS:

```bash
rustup default stable
rustup update
rustup update nightly
rustup target add wasm32v1-none --toolchain nightly
rustup component add rust-src --toolchain stable-aarch64-apple-darwin
```

Other platform-specific instructions can be found at https://docs.polkadot.com/infrastructure/running-a-node/setup-full-node

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

When running the above script, you will see in the terminal something like:

```bash
Polkadot Bulletin Local Testnet ⚙ Added Boot Nodes
/ip4/127.0.0.1/tcp/10001/ws/p2p/12D3KooWQCkBm1BYtkHpocxCwMgR8yjitEeHGx8spzcDLGt2gkBm            
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

### 5. Storing at Bulletin Chain

Run the script at ipfs-client

```js
cd ipfs-client
npm install
node main.js
```

### 2. Retrieve the data you have stored previously

1. Through Kubo-CLI:

```bash
ipfs block get <CID_HERE>
```

2. Through the node gateway:

http://127.0.0.1:8080/ipfs/<CID_HERE>

