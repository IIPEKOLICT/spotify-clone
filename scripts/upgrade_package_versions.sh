#!/usr/bin/env bash

TELEPORTS=("socket-server" "../server" "../client")

for TELEPORT in "${TELEPORTS[@]}"
  do
    cd "$TELEPORT" && npx npm-check-updates "/^@yumasoft-spotify.*$/" --upgrade
  done
