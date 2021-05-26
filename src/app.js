var express = require("express");
var server = express();
var bodyParser = require("body-parser");

var model = {
  clients: {},

  reset: () => {
    model.clients = {};
  },

  addAppointment: (client, date) => {
    if (!model.clients[client]) {
      model.clients[client] = [];
    }
    model.clients[client].push({ ...date, status: "pending" });
  },

  attend: (name, date) => {
    model.clients[name].forEach((elemento) => {
      if (elemento.date === date) {
        elemento.status = "attended";
      }
    });
  },

  expire: (name, date) => {
    model.clients[name].forEach((elemento) => {
      if (elemento.date === date) {
        elemento.status = "expired";
      }
    });
  },

  cancel: (name, date) => {
    model.clients[name].forEach((elemento) => {
      if (elemento.date === date) {
        elemento.status = "cancelled";
      }
    });
  },

  erase: (name, borrar) => {
    var borrados = model.clients[name].map((c) => c.date == borrar);
    var borradosS = model.clients[name].map((c) => c.status == borrar);
    model.clients[name] = model.clients[name].filter((c) => c.date != borrar);
    model.clients[name] = model.clients[name].filter((c) => c.status != borrar);
    if (borrados) return borradosS;
    else return borrados;
  },

  getAppointments: (name, status) => {
    if (status) {
      const result = model.clients[name].filter(
        (citas) => citas.status == status
      );
      return result;
      // return (arrasyStatus = model.clients[name].filter(
      //   (c) => (c.status = status)
      // ));
    } else {
      return model.clients[name];
    }
  },
  getClients: () => {
    // console.log(Object.values(model.clients));
    return Object.keys(model.clients);
  },
};

server.use(bodyParser.json());

server.get("/api", (req, res) => {
  res.send(model.clients);
});

server.get("/api/Appointments/clients", (req, res) => {
  const result = model.getClients();
  console.log(result);
  res.status(200);
  res.send(result);
});

server.post("/api/Appointments", (req, res) => {
  const { client, appointment } = req.body;
  if (!client) {
    res.status(400);
    return res.send("the body must have a client property");
  }
  if (typeof client !== "string") {
    res.status(400);
    return res.send("client must be a string");
  }
  model.addAppointment(client, appointment);
  res.send({ date: appointment.date, status: "pending" });
});
/////////////////////////////////
server.get("/api/Appointments/:name", (req, res) => {
  const name = req.params.name;
  const date = req.query.date;
  const status = req.query.option;

  // compruebo el cliente exista en el objeto
  if (!model.clients.hasOwnProperty(name)) {
    res.status(400);
    return res.send("the client does not exist");
  }

  // Compruebo que tenga una cita:
  const cita = model.clients[name].find((e) => e.date === date);
  if (!cita) {
    res.status(400);
    return res.send("the client does not have a appointment for that date");
  }

  switch (status) {
    case "attend":
      model.attend(name, date);
      return res.send(cita);

    case "expire":
      model.expire(name, date);
      return res.send(cita);

    case "cancel":
      model.cancel(name, date);
      return res.send(cita);

    default:
      res.status(400).send("the option must be attend, expire or cancel");
      break;
  }
});
// server.get("/api/Appointments/:name/erase?", (req, res) => {
//   const name = req.params.name;
//   const status = req.query.date;
//   console.log(name);
//   console.log(status);
// });

server.get("/api/Appointments/:name/erase", (req, res) => {
  const name = req.params.name;
  const date = req.query.date;
  const client = model.clients[name];

  if (!client) {
    return res.status(400).send("the client does not exist");
  }

  const eDelete = model.erase(name, date);
  res.send(eDelete);
});
server.get("/api/Appointments/getAppointments/:name", (req, res) => {
  const name = req.params.name;
  const status = req.query.status;
  const result = model.getAppointments(name, status);
  res.send(result);
});

server.listen(3005);
module.exports = { model, server };
