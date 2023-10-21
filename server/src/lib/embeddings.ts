import fs from "fs";
import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";
config();
import { supabase } from "./supabase";

function createChunk(text: string, chunksize: any) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunksize));
    i += chunksize;
  }
  return chunks;
}
