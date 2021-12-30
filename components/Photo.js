import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Image, Text, useWindowDimensions } from 'react-native';

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

function Photo({ id, item }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  // useEffect(() => {
  //   if (photos) {
  //     Image.getSize(photos[0].url, (width, height) => {
  //       setImageHeight(height / 3);
  //     });
  //   }
  // }, [photos]);

  return (
    <Container>
      {item?.photos?.map((photo) => (
        <File
          key={photo.id}
          style={{
            width,
            height: imageHeight,
          }}
          source={{ uri: photo.url }}
        />
      ))}
      <Text style={{ color: 'yellow' }}>name : {item.name}</Text>
      <Text style={{ color: 'pink' }}>
        {item.categorys.map((category) => category.name)}
      </Text>
    </Container>
  );
}

export default Photo;
