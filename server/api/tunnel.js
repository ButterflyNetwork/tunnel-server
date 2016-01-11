import assert from 'assert';
import { Router } from 'express';

import { getNetwork } from '../lib/network-registry';
import { getServerPort } from '../lib/tunnel-server';

export default function () {
  const api = new Router();

  api.put('/', (req, res) => {
    const { hostname, port } = req.body;
    assert(hostname, port);

    const network = getNetwork(req.networkId);


    const tunnelServerHost = req.header('host').replace(/:.*$/, '');
    const tunnelServerPort = getServerPort();

    network.openTunnel(tunnelServerHost, tunnelServerPort,
      `${hostname}:${port}`, s => res.send(s));
  });

  return api;
}
