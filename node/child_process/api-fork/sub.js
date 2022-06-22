process.on("message", (m) => {
  console.log("Child get message: ", Buffer.from(m.buf).toString());
  process.send({ foo: "bar" });
});
