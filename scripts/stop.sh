#!/usr/bin/env bash

set -e

npm --prefix packages/assets stop

docker system prune --force
