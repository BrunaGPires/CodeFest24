const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/salvar-dados", (req, res) => {
    const novoUsuario = req.body;

    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return res.status(500).send("Erro no servidor ao ler o arquivo");
        }

        let dados = [];
        try {
            dados = JSON.parse(data);
        } catch (parseError) {
            console.error("Erro ao parsear o arquivo:", parseError);
        }

        dados.push(novoUsuario);
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(dados, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Erro ao escrever no arquivo:", writeErr);
                return res.status(500).send("Erro no servidor ao salvar os dados");
            }

            res.status(200).send("Dados salvos com sucesso");
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});