import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const TopContentContainer = styled.View`
  background-color: tomato;
  flex: 1;
  flex-direction: row;
  width: 100%; ;
`;

export default function Me() {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TopContentContainer>
        <View>
          <View>
            <Text>me profile</Text>
          </View>
        </View>
      </TopContentContainer>
    </View>
  );
}
