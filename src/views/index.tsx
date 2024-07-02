import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CardComponent from "../components";

import * as S from "./styles";
import { getVerse, translateText } from "../api";
import { Portal } from "react-native-paper";

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
      <S.ModalContainer>
        <Portal>
          <S.Modal
            visible={errorMessage}
            onDismiss={() => setErrorMessage(!errorMessage)}
          >
            <S.TitleModal>
              Erro ao buscar ou traduzir o versículo. Por favor, tente
              novamente.
            </S.TitleModal>
            <S.ButtonModal onPress={() => setErrorMessage(!errorMessage)}>
              Fechar
            </S.ButtonModal>
          </S.Modal>
        </Portal>
      </S.ModalContainer>
    );
  }

  async function fetchAndTranslateVerse() {
    try {
      const verse = await getVerse();
      const translatedVerse = await translateText(verse, "pt");

      setVersion({
        title: `Livro: ${translatedVerse.bookname}`,
        titleCardContent: `Capítulo ${translatedVerse.chapter}, Versículo ${translatedVerse.verse}`,
        subTitle: "Versículo Traduzido",
        bodyTitleContent: translatedVerse.text,
        imgUri: "https://imgur.com/3OnGilN",
      });
    } catch (error) {
      setErrorMessage(!errorMessage);
      console.error("Erro ao buscar ou traduzir o versículo:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndTranslateVerse();
  }, []);

  return (
    <S.Container>
      {loading ? (
        <S.Loading />
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
    </S.Container>
  );
}
