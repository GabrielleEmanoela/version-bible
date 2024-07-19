import axios from "axios";

const verseUrl = "https://labs.bible.org/api/?passage=random&type=json";
const translateUrl =
  "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=en&tl=pt&q=";

export type Verse = {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
};

export async function getVerse(): Promise<Verse> {
  try {
    const response = await axios.get(verseUrl);
    console.log(response.data);
    return response.data[0];
  } catch (error) {
    console.log("Erro ao buscar o versículo:", error);
    throw error;
  }
}

export async function translateText(
  verse: Verse,
  targetLang: string
): Promise<Verse> {
  try {
    const response = await axios.get(translateUrl + encodeURI(verse.text));
    const translatedText = response.data[0][0][0];

    return {
      ...verse,
      text: translatedText,
    };
  } catch (error) {
    console.log("Erro ao traduzir o texto:", error);
  }
}

export const fetchRandomImage = async () => {
  try {
    const response = await axios.get("https://picsum.photos/200/300", {
      responseType: "arraybuffer",
    });
    const image = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/jpeg;base64,${image}`;
    return imageUrl;
  } catch (error) {
    console.log("Error fetching image:", error);
    throw error;
  }
};
