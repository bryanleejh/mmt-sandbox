import gql from 'graphql-tag';

export const GET_CITIES_V2_QUERY = gql`
  query CitiesV2($country: GlobalEntityID!) {
    citiesV2(global_entity_id: $country) {
      name
      slug
    }
  }
`;

export const GET_AREAS_QUERY = gql`
  query Areas($country: GlobalEntityID!, $city: String!) {
    areas(global_entity_id: $country, city_slug: $city) {
      region {
        id
        name
      }
      districts {
        id
        name
      }
    }
  }
`;
