import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CardComponent from "../components";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import { fetchRandomImage, getVerse, translateText } from "../api";

type CardComponentType = {
  title: string;
  subTitle: string;
  titleCardContent: string;
  bodyTitleContent: string;
  imgUri: string;
};

type Verse = {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
};

export default function HomeScreen() {
  const [version, setVersion] = useState<CardComponentType>({
    title: "",
    subTitle: "",
    titleCardContent: "",
    bodyTitleContent: "",
    imgUri: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  function modal() {
    return (
      <Provider>
        <Portal>
          <Modal
            visible={errorMessage}
            onDismiss={() => setErrorMessage(!errorMessage)}
          >
            <Text>
              {
                "Erro ao buscar ou traduzir o versículo. Por favor, tente novamente."
              }
            </Text>
            <Button onPress={() => setErrorMessage(!errorMessage)}>
              Fechar
            </Button>
          </Modal>
        </Portal>
      </Provider>
    );
  }
  useEffect(() => {
    async function fetchAndTranslateVerse() {
      try {
        const verse = await getVerse();
        const translatedVerse = await translateText(verse, "pt");
        const randomImage = await fetchRandomImage();

        setVersion({
          title: `Livro: ${translatedVerse.bookname}`,
          subTitle: `Capítulo ${translatedVerse.chapter}, Versículo ${translatedVerse.verse}`,
          titleCardContent: "Versículo Traduzido",
          bodyTitleContent: translatedVerse.text,
          imgUri: randomImage,
        });
      } catch (error) {
        setErrorMessage(!errorMessage);
        console.error("Erro ao buscar ou traduzir o versículo:", error);
      }
    }

    fetchAndTranslateVerse().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ justifyContent: "center", flex: 1 }}
        />
      ) : (
        <>
          <CardComponent
            title={version.title}
            subTitle={version.subTitle}
            titleCardContent={version.titleCardContent}
            bodyTitleContent={version.bodyTitleContent}
            imgUri={version.imgUri}
          />
          {modal()}
        </>
      )}
    </View>
  );
}
