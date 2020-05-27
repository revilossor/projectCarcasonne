#!/usr/bin/env bash

set -e

cleanup() {
    npm --prefix packages/assets stop
    docker system prune --force
    exit 0
}

trap "cleanup" INT

npm --prefix packages/assets start

npm --prefix packages/game start
