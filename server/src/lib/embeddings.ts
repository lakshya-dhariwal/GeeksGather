import fs from "fs";
import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";
config();
import { supabase } from "./supabase";
import { openai } from "./openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

async function getDocuments() {
  const documentPaths = [
    "./documents/scroll.pdf",
    // Add more file paths as needed
  ];

  const documentTexts = [];

  for (const filePath of documentPaths) {
    try {
      const documentText = await readPDF(filePath);
      documentTexts.push(documentText);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
    }
  }

  return documentTexts;
}

async function readPDF(filePath: any) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function createChunk(text: string, chunksize: any) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunksize));
    i += chunksize;
  }
  return chunks;
}

export async function generateEmbeddings() {
  const documents = await getDocuments();

  for (const document of documents) {
    //@ts-ignore
    const input = document.replace(/\n/g, " ");
    //@ts-ignore
    const inputChunks = createChunk(document.replace(/\n/g, " "), 500); // Adjust the chunk size as needed

    const embeddings = [];

    for (const chunk of inputChunks) {
      const embeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: chunk,
      });

      const [{ embedding }] = embeddingResponse.data.data;
      embeddings.push(embedding);
    }

    console.log('')

    // Merge the embeddings if they were split into chunks
    const mergedEmbedding = embeddings.join(" ");

    const { data, error } = await supabase
      .from("Events")
      .update([{ embedding: mergedEmbedding }])
      .eq("id", 2);

    console.log({ data, error });
  }
}
