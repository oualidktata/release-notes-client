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

const VERSIONDETAILS_BY_VERSION_ID=gql`
query versionDetailsByVersionId($versionId:ID!){
  versionDetailsByVersionId(versionId:$versionId)
  {
    id
    shortDescription
    longDescription
    status{
      code
    }
    changeType{
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
const ADD_VERSION_DETAIL = gql`
mutation addVersionDetail($input:VersionDetailInput){
  addVersionDetail(input:$input)
  {
    id
    status{
      id
    }
    changeType{
      id
    }
    isActive
    links{
        id
        name
    }
  }
}
`;

const APPLICATIONS = gql`
  query applications($tenantId: ID!) {
    applications(tenantId: $tenantId) {
      id
      name
      tenant{
          id
          name
      }
    }
  }
`;

const STATUSES = gql`
query statuses($tenantId:ID!) {
  statuses(tenantId:$tenantId){
    id
    code
    description
    isActive
  }
}
`;
const CHANGE_TYPES = gql`
query changeTypes($tenantId:ID!) {
  changeTypes(tenantId:$tenantId){
    id
    name
    description
    isActive
  }
}
`;
const TARGET_SYSTEMS = gql`
query targetSystems($tenantId:ID!) {
  targetSystems(tenantId:$tenantId){
    id
    name
    description
    isActive
  }
}
`;

export {
  VERSIONS,
  GET_VERSION_BY_ID,
  VERSIONDETAILS_BY_VERSION_ID,
  
  APPLICATIONS,
  STATUSES,
  CHANGE_TYPES,
  TARGET_SYSTEMS,
  ADD_VERSION,
  ADD_VERSION_DETAIL,
};
