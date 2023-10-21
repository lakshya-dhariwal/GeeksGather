import fs from "fs";
import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";
config();
import { supabase } from "./supabase";
import { openai } from "./openai";

function createChunk(text: string, chunksize: any) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunksize));
    i += chunksize;
  }
  return chunks;
}

//embed the given chunked text using openai embedding api to get vector
function embedText(inputText: string) {
  try {
    var result = "";
    return new Promise((resolve) => {
      openai
        .createEmbedding({
          model: "text-embedding-ada-002",
          input: inputText,
        })
        .then((res: any) => {
          //console. log (res.data ['data'] [0] ["embedding"|)
          result = res.data["data"][0]["embedding"];
          return result;
        });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function ReadDocumentContentToSupbaseDBTable() {
  try {
    fs.readFile("./documents/scroll.pdf", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
      const lines = data.split("\n");
      const concatenatedFileText = lines.join(" ").trim().replace(/\s+/g, " ");

      const chunkSize = 500; // Adjust the chunk size as per your requirements
      const chunks = createChunk(concatenatedFileText, chunkSize);
      for (const chunk of chunks) {
        embedText(chunk)!.then(async (result) => {
          //save to supbase postgres database
          const { data, error } = await supabase
            .from("semantic_vector_search")
            .insert({
              content: chunk,
              embedding: result,
            });
          setTimeout(() => {}, 500);
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
