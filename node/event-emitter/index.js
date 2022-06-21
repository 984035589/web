const EventEmitter = require("events");

const myEvent = new EventEmitter();

const MY_EVENT = "my_event";
const SIGNAL = "signal";

myEvent.addListener(MY_EVENT, (params) => {
  console.log(`----1----`, params);
});

myEvent.on(MY_EVENT, () => {
  console.log(`----1----`);
});

myEvent.prependListener(MY_EVENT, () => {
  console.log(`-----2----`);
});

myEvent.prependListener(MY_EVENT, () => {
  console.log(`-----3----`);
});

myEvent.emit(MY_EVENT, { params: 1 });

class Signal extends EventEmitter {
  constructor() {
    super();
  }
}

const signal = new Signal();
signal.on(SIGNAL, () => {
  console.log(signal);
});

class Connection extends Signal {
  constructor() {
    super();
  }
}

const connection = new Connection();
connection.emit(SIGNAL, { params: 1 });
