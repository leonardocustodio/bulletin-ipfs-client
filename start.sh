#!/usr/bin/env bash

cd polkadot-bulletin-chain || exit
cargo build --release -p polkadot-bulletin-chain
cd ..

POLKADOT_BULLETIN_BINARY_PATH=./polkadot-bulletin-chain/target/release/polkadot-bulletin-chain zombienet -d bulletin-data -p native spawn ./polkadot-bulletin-chain/zombienet/bulletin-polkadot-local.toml
