import { gql } from "@apollo/client";
const VERSIONS = gql`
  query versionsByApp($appIds: [ID]!) {
    versionsByApp(appIds: $appIds) {
      id
      major
      minor
      patch
      description
    }
  }
`;

const ADD_VERSION = gql`
  mutation addVersion($major: String!, $minor: String!, $patch: String!,$appId:ID!,$description:String!) {
    addVersion(major: $major, minor: $minor, patch: $patch,description:$description,appId:$appId) {
      major
      minor
      patch
      description
      application
      {
        id
      }
    }
  }
`;

const APPLICATIONS = gql`
  query APPLICATIONS($tenantId: ID!) {
    applicationsByTenant(tenantId: $tenantId) {
      id
      name
      tenant{
          id
          name
      }
    }
  }
`;

export {
  ADD_VERSION,
  VERSIONS,
  APPLICATIONS
};
