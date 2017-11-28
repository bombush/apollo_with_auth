import "babel-polyfill";
import { graphql } from 'graphql';

import schema from '../schema/schema.js';
import mockModerator from '../mockUsers/moderator';

test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

it('Should return a user with queried props.', async () => {
  const query = `
    query Me {
      me {
        id
        name
      }
    }
  `;

  const rootValue = {};
  const context = { user: mockModerator };

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.me.id).toBe("1");
})
