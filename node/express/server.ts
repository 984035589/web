import express from "express";
import { DataClass } from "./getData";

const app = express();

app.get("/", (req, res) => {
  res.json(DataClass.data);
});

app.listen(520, () => {
  console.log("服务启动了");
});
