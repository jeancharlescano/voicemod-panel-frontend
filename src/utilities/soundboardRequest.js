import axios from "axios";

export const playSoundboard = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.1.151:3000/api/voicemod/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("🚀 ~ playSoundboard ~ error:", error);
  }
};

export const getSoundboards = (url) =>
  fetch(url)
    .then((res) => res.json()) // ✅ Il faut retourner la promesse `res.json()`
    .then((json) => json.data); // ✅ Extraction de `data`
