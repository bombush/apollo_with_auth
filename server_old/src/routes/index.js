import fs from 'fs';
import path from 'path';

import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Layout from '../../../src/Layout';

const route = (req, res) => {
  console.time('wholeroute');
  //res.send('Hi')
  const client = new ApolloClient({
    ssrMode: true,

    link: createHttpLink({
      uri: 'https://api.graph.cool/simple/v1/cj9ptu0dm89hc0151pnedmolp',
      fetch
    }),
    cache: new InMemoryCache()
  });

  const context = {};

  const app = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );

  const Html = ({content, state}) => (
    <html>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }} />
      </body>
    </html>
  );

  console.time('getdata');

  getDataFromTree(app).then(() => {
    console.timeEnd('getdata');
    console.time('rendertostring');
    const content = renderToString(app);
    console.timeEnd('rendertostring');
    const initialState = client.cache.extract();

    console.time('template');
    const templateBuffer = fs.readFileSync(path.resolve(__dirname, '../../../build/index.html'))
    const template = templateBuffer.toString();
    const templateReplaced =
      template
        .replace(
          '<div id="root"></div>',
          `<div id="root"></div><script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script></body>`)
        .replace('<div id="root"></div>', `<div id="root">${content}</div>`);

    console.timeEnd('template');
    //const html = (<Html content={content} state={initialState} />);

    res.status(200);
    res.send(templateReplaced);
    //res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);

    res.end();
    console.timeEnd('wholeroute');

  });
}

export default route;