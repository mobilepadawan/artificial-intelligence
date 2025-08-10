import express from "express";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(express.json());

// Gestionar las claves: https://huggingface.co/settings/tokens
const hf = new InferenceClient(process.env.HF_API_KEY);

// Mapeo de modelos disponibles
const MODELS = {
  textGeneration: "DeepSeek-R1-Zero",
  summarization: "facebook/bart-large-cnn",
  translation: "Helsinki-NLP/opus-mt-en-es",
  sentiment: "distilbert-base-uncased-finetuned-sst-2-english"
};

// Ruta para generar texto
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Falta el prompt" });

  try {
    const result = await hf.textGeneration({
      model: MODELS.textGeneration,
      inputs: prompt,
      parameters: { max_new_tokens: 100, temperature: 0.7, return_full_text: false }
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando texto" });
  }
});

// Ruta para resumir texto
app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Falta el texto" });

  try {
    const result = await hf.summarization({
      model: MODELS.summarization,
      inputs: text
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error resumiendo texto" });
  }
});

// Ruta para traducir texto
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Falta el texto" });

  try {
    const result = await hf.translation({
      model: MODELS.translation,
      inputs: text
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error traduciendo texto" });
  }
});

// Ruta para análisis de sentimiento

// app.post("/sentiment", async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: "Falta el texto" });

//   try {
//     const result = await hf.textClassification({
//       model: MODELS.sentiment,
//       inputs: text
//     });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error analizando sentimiento" });
//   }
// });

app.post("/sentiment", async (req, res) => {
  const block = req.body;
  res.setHeader('Content-Type', 'application/json');

  if (!block) {
    res.status(400).json({ error: "Falta el texto" });
  }

  if (Array.isArray(block)) {
    block.forEach(async (sentiment) => {
      const arrayResults = []

      try {
        for (const item of block) {
          const result = await hf.textClassification({
            model: MODELS.sentiment,
            inputs: item.text
          });
          arrayResults.push(...result);
        }
        
        res.json(arrayResults);

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el análisis de sentimientos." });
      }
    })
  } else {
    res.status(400).json({error: "Debes enviar un array con al menos un sentimiento."})
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor listo en http://localhost:${process.env.PORT}`)
);
