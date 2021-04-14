import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const HomeCard = () => {
  const [data, setData] = useState();

  const info = {
    Title: "Test",
    image: "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    Location: "Gulshan",
  };
  useEffect(() => {
    setData(info);
  });
  console.log(info);
  return (
    <View>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{}} />
      </Card>
    </View>
  );
};
export default HomeCard;
