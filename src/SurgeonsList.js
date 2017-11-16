import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import SurgeonTreatments from './SurgeonTreatments';

const channelsListQuery = gql`
  query ChannelsListQuery {
    surgeons {
      id
      name
    }
  }
`;

const SurgeonsList = ({ data: { surgeons, error, loading }, match }) => {
  if (loading) return <p>loading...</p>

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul>
        {surgeons.map(surgeon => <Link key={surgeon.id} to={`${match.url}/treatments/${surgeon.id}`}>{surgeon.name}<br/></Link>)}
      </ul>
        <Route exact path={`${match.url}/treatments/:surgeonId`} component={SurgeonTreatments}>
        </Route>
    </div>
  );
};

export default 
  graphql(channelsListQuery)(SurgeonsList);
