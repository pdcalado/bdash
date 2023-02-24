# 🚨 bdash

A Block based basic Dashboard for presenting mostly key value data.

Uses [kave-server](https://github.com/pdcalado/kave) as a backend, but can be pointed to any HTTP server allowing GETs by path. Uses Auth0 as an auth provider, injects access token in all requests. [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) makes it easy to have a responsive layout with simple blocks.

Inspired by freeboard.io but more minimalistic (and shorter on features) while supporting auth using Auth0.

## Why?

I just needed a very simple setup, which supports an auth backend that I already use, so I can monitor personal stuff (website, demos, VPS etc).

## Demo

A **[demo is running here](bdash-demo.pages.dev)**, auth is disabled and [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) is used as data source, instead of an actual HTTP backend.

## Build

Run:

```console
foo@bar:~$ npm install && npm run build
```

Then you can serve the folder `./build` statically.
