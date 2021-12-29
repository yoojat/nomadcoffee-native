import { gql } from '@apollo/client';

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on CoffeeShopPhoto {
    id
    url
  }
`;
