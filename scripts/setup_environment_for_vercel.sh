#!/usr/bin/env bash

ENV_VARIABLES_CONFIG=$(<env-variables.json)

BACKEND_ENV_VARIABLES_ARRAY=($(echo "$ENV_VARIABLES_CONFIG" | jq -r '.server[]'))

for VARIABLE in "${BACKEND_ENV_VARIABLES_ARRAY[@]}"
  do
    echo "TARGET_$VARIABLE=production,preview,development" >> "$GITHUB_ENV"
    echo "TYPE_$VARIABLE=plain" >> "$GITHUB_ENV"
  done

BACKEND_ENV_VARIABLES=$(printf "%s," "${BACKEND_ENV_VARIABLES_ARRAY[@]}")

echo "BACKEND_ENV_VARIABLES=${BACKEND_ENV_VARIABLES%,}" >> "$GITHUB_ENV"
