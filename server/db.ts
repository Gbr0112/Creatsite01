import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

// Configuração necessária para funcionar com WebSocket
neonConfig.webSocketConstructor = ws;

// Verifica se a variável de ambiente foi carregada corretamente
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Cria o pool de conexões com o banco
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inicializa o drizzle com o schema compartilhado
export const db = drizzle({ client: pool, schema });
