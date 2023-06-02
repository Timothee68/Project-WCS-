import { gql} from '@apollo/client';

export const GET_ALL_WILDERS = gql`
query getAllWilders {
  getAllWilders {
    id
    name
    city
    grades {
      grade
      skill {
        name
      }
    }
  }
}`;

export const GET_ALL_SKILLS = gql`
query getAllSkills {
  getAllSkills {
    id
    name
  }
}`;

export const DELETE_WILDER = gql`
mutation deleteWilder($id: Int!) {
  deleteWilder(id: $id)
}`;

export const CREATE_WILDER = gql`
  mutation CreateWilder($name: String!, $city: String!) {
    createWilder(name: $name, city: $city) {
      name
      city
    }
  }
`;
 
export const UPDATE_WILDER = gql`
  mutation UpdateWilder($id: Int!, $name: String!, $city: String!) {
    updateWilder(id: $id, name: $name, city: $city) {
      id
      name
      city
    }
  }
`;

export const CREATE_SKILL = gql`
mutation Mutation($name: String!) {
  createSkill(name: $name) {
    name
  }
}`;