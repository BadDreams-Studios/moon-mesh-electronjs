import createMoonMesh from './createMoonMesh.mjs';

process.env.DEBUG = "libp2p:*"

const core = createMoonMesh();

await core.start();
await core.stop();