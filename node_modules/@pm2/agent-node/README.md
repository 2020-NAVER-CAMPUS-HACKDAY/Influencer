# pm2-io-agent-node

This module is used by [@pm2/io](https://github.com/keymetrics/pm2-io-apm) to communicate with [PM2.io](https://pm2.io/plus)'s servers.

This module is using [websocket](https://github.com/websockets/ws) to send and receive data from websocket server.

**NOTE:** This module is only compatible with node >= 6

## How to use

Just like that:

```js
const Agent = require('@pm2/agent-node')

// This object is used by the agent to send data for each status, you can edit it when you want
const process = {
  axm_options: {}
}

// Init connection and verify credentials
const agent = new Agent({
  publicKey: '', // Your PM2 Plus public key
  secretKey: '', // Your PM2 Plus secret key
  appName: '' // Your application name (used as server name also)
}, process)

// If public or secret key is invalid, an error will be throw
await agent.start()
```

You can send data like this:

```js
agent.send('process:exception', {data: ...})
```

## Release

To release a new version, first install [gren](https://github.com/github-tools/github-release-notes) :
```bash
yarn global add github-release-notes
```

Push a commit in github with the new version you want to release : 
```
git commit -am "version: major|minor|patch bump to X.X.X"
```

Care for the **versionning**, we use the [semver versioning](https://semver.org/) currently. Please be careful about the version when pushing a new package.

Then tag a version with git : 
```bash
git tag -s vX.X.X
```

Push the tag into github (this will trigger the publish to npm) : 
```
git push origin vX.X.X
```

To finish update the changelog of the release on github with `gren` (be sure that gren has selected the right tags):
```
gren release -o -D commits -u keymetrics -r pm2-io-agent-node
```