import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { PHOTO_FRAGMENT } from '../fragments';

const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($offset: Int) {
    seeCoffeeShops(offset: $offset) {
      coffeeShops {
        id
        name
        user {
          id
        }
        photos {
          id
          url
        }
        categorys {
          id
          name
        }
      }
    }
  }
`;

export default function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore, error } = useQuery(
    SEE_COFFEE_SHOPS,
    {
      variables: {
        offset: 0,
      },
    }
  );

  const renderPhoto = (item) => {
    return <Photo {...item} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={async () => {
          const result = await fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.coffeeShops.length,
            },
          });
          return result;
        }}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops.coffeeShops}
        keyExtractor={(photo) => '' + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
