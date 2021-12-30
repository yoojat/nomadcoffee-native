import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { gql, useLazyQuery } from '@apollo/client';

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      coffeeShops {
        id
        name
        photos {
          url
        }
        categorys {
          name
        }
      }
    }
  }
`;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();

  const [startQueryFn, { loading, data, called, error }] =
    useLazyQuery(SEARCH_COFFEESHOPS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor='rgba(0, 0, 0, 0.8)'
      style={{ backgroundColor: 'white' }}
      placeholder='Search photos'
      autoCapitalize='none'
      returnKeyLabel='Search'
      returnKeyType='search'
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword', {
      required: true,
      minLength: 1,
    });
  }, []);

  const renderItem = ({ item: coffeeShop }) => (
    <View>
      <Image
        source={{ uri: coffeeShop.photos[0].url }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <Text style={{ color: 'red' }}>
        {coffeeShop.categorys.map((category) => category.name)}
      </Text>
    </View>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size='large' />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined &&
        data?.searchCoffeeShops?.coffeeShops ? (
          data?.searchCoffeeShops?.coffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShops.coffeeShops}
              keyExtractor={(coffeeShop) => '' + coffeeShop.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
