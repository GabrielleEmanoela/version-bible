import styled from "styled-components/native";
import {
  ActivityIndicator,
  Button,
  Modal as ModalPaper,
  Portal,
  Provider,
} from "react-native-paper";

export const Container = styled.View`
  flex: 1;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: "large",
  color: "#0000ff",
})`
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled(Provider)``;
export const Modal = styled(ModalPaper)``;
export const TitleModal = styled.Text``;
export const ButtonModal = styled(Button)``;
