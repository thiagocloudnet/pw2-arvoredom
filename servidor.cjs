// thiago.cloud — servidor local de desenvolvimento; não usado no GitHub Pages.
"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const arquivos = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/estilo.css": ["estilo.css", "text/css; charset=utf-8"],
  "/exercicios.js": ["exercicios.js", "text/javascript; charset=utf-8"],
  "/marca-0.png": ["marca-0.png", "image/png"],
  "/marca-1.png": ["marca-1.png", "image/png"]
};
http.createServer((req, res) => {
  const arquivo = arquivos[new URL(req.url, "http://localhost").pathname];
  if (!arquivo) { res.writeHead(404); res.end("Não encontrado"); return; }
  fs.readFile(path.join(__dirname, arquivo[0]), (erro, dados) => {
    if (erro) { res.writeHead(500); res.end("Falha ao ler arquivo"); return; }
    res.writeHead(200, { "Content-Type": arquivo[1] });
    res.end(dados);
  });
}).listen(8080, "0.0.0.0", () => console.log("Laboratório: http://localhost:8080"));
