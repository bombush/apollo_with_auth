import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


const SurgeonTreatments = (props, data) => {
  if (data.loading) return <p>loading...</p>

  if (data.error) return <p>{data.error.message}</p>;
  {console.log('COMPONENT IN:', props,data)}

  return (
      <div>treatments:
        <br/><br/> 
        {props.data.treatmentsForSurgeon && props.data.treatmentsForSurgeon.map( 
          treatment => <span><b>{treatment.name}</b>(ID: {treatment.id})<br/></span>
          ) || ''}
      </div>
  );
};

/*
Channel.fragments = {
  note: gql`
    fragment Channel_note on Channel {
      name
    }
  `
};*/
const surgeonTreatmentsQuery = gql`
  query SurgeonTreatmentsQuery($surgeonId:ID) {
    treatmentsForSurgeon(surgeonId: $surgeonId) {
      id
      name
    }
  }
`;

export default graphql(
  surgeonTreatmentsQuery,
  {
    options: ({match : { params : {surgeonId}}}) => ({variables: {surgeonId}})
  }
)
(SurgeonTreatments);
