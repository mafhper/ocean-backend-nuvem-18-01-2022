const express = require("express");
const { MongoClient, ObjectId, HostAddress } = require("mongodb");
const url =
  "mongodb+srv://admin:LF5RH2DP58@9CtF@cluster0.3y5kc.mongodb.net/retryWrites=true&w=majority";
const dbName = "ocean_bancodados_18_01_2022";

async function main() {
  // Conexão com o Banco de Dados

  //   const client = await MongoClient.connect(url);
  //   const db = client.db(dbName);
  //   const collection = db.collection("herois");

  const collection = undefined;

  // Aplicação em Express
  const app = express();

  // Sinalizo para o Express que o body das requisições
  // estará sempre estruturado em JSON
  app.use(express.json());

  // Load css from public folder
  app.use(express.static("public"));

  // Endpoint "/"
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  // Endpoint "/oi"
  app.get("/oi", (req, res) => {
    res.send("<h1>Oi, mundo!</h1>");
  });

  const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
  //              0                   1                2

  // [GET] "/herois" - Read All (Ler todos os registros)
  app.get("/herois", async (req, res) => {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  // [GET] "/herois/:id" - Read Single (by Id) (Ler um registro pelo ID)
  app.get("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  });

  // [POST] "/herois" - Create (Criar um registro)
  app.post("/herois", async (req, res) => {
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });

  // [PUT] "/herois/:id" - Update (Atualizar um registro)
  app.put("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: item,
      }
    );
    res.send(item);
  });

  // [DELETE] "/herois/:id" - Delete (Remover um registro)
  app.delete("/herois/:id", async (req, res) => {
    const id = req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.send("Item removido com sucesso.");
  });

  // [LISTEN] - On Heroku and Localhost
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
    console.log(`http://localhost:${process.env.PORT || 3000}`);
  });
}

main();
