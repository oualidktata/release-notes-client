import { gql } from "@apollo/client";
const VERSIONS = gql`
  query versionsByApp($appIds: [ID]!) {
    versionsByApp(appIds: $appIds) {
      id
      major
      minor
      patch
      description
      application{
        id
        name
      }
    }
  }
`;

const GET_VERSION_BY_ID=gql` 
query versionById($id:ID!){
  versionById(id:$id){
    id
    major
    minor
    patch
    description
    application{
      id
      name
    }
  }
}`;

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
  query applications($tenantId: ID!) {
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
  VERSIONS,
  GET_VERSION_BY_ID,
  APPLICATIONS,
  ADD_VERSION,
};
