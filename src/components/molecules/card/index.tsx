import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

export type CardComponentType = {
  title: string;
  subTitle: string;
  titleCardContent: string;
  bodyTitleContent: string;
  imgUri: string;
};

export const CardComponent = (props: CardComponentType) => (
  <Card style={{ flex: 1, flexGrow: 20, justifyContent: "center", margin: 20 }}>
    <Card.Title {...props} />
    <Card.Content>
      <Text variant="titleLarge" style={{}}>
        {props.titleCardContent}
      </Text>
      <Text variant="bodyMedium">{props.bodyTitleContent}</Text>
    </Card.Content>
    <Card.Cover
      source={{ uri: "https://imgur.com/3OnGilN.png" }}
      style={{ marginTop: 20, marginHorizontal: 20 }}
    />
  </Card>
);
