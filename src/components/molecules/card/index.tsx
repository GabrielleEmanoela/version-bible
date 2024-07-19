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
  <Card>
    <Card.Title {...props} />
    <Card.Content>
      <Text variant="titleLarge">{props.titleCardContent}</Text>
      <Text variant="bodyMedium">{props.bodyTitleContent}</Text>
    </Card.Content>
    {/* <Card.Cover source={{ uri: props.imgUri }} /> */}
  </Card>
);
