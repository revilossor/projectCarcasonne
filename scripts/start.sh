#!/usr/bin/env bash

set -e

npm --prefix packages/assets start

npm --prefix packages/game start
