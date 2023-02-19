#!/usr/bin/env bash

usage() {
    echo -e "This script bumps package.json to the new version given by arg and creates the tag.\n"
    echo -e "Usage:\n$0 <version>\n"
}

if [ $# -lt 1 ]
then
    usage
    exit 1
fi

VERSION=${1#"v"}

jq '.version="'"${VERSION}"'"' package.json > /tmp/package.json
mv /tmp/package.json package.json

git add package.json
git ci -m "Bump package.json to version $1"

git tag -a -s -m "Version ${VERSION}" "v${VERSION}"
git push origin main && git push -u origin "v${VERSION}"