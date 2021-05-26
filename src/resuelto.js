// var express = require("express");
// var server = express();
// var bodyParser = require("body-parser");

// var model = {clients: {},
//             reset: function(){
//                 this.clients = {};
//             },
//             addAppointment: function(name, date){
//                 date = {
//                     ...date,
//                     status: 'pending',
//                 };

//                 if(this.clients[name]){//si el cliente ya existe solo le agregamos el nuevo dato
//                     this.clients[name].push(date);
//                 }else{//si el cliente no existe lo creamos
//                     this.clients[name]=[date];
//                 }
//             },
//             attend: function(name, date){//cuando una cita se procesa se coloca con status attended
//                 this.clients[name].forEach(p =>{
//                     if(p.date === date){
//                         p.status = 'attended';
//                     }
//                 });
//             },
//             expire: function(name, date){//cuando una cita expira se coloca con status expired
//                 this.clients[name].forEach(p =>{
//                     if(p.date === date){
//                         p.status = 'expired';
//                     }
//                 });
//             },
//             cancel: function(name, date){//cuando se cancela una cita se coloca en estado cancelled
//                 this.clients[name].forEach(p =>{
//                     if(p.date === date){
//                         p.status = 'cancelled';
//                     }
//                 });
//             },
//             erase: function(name, date){//función para eliminar una cita
//                 this.clients[name] = this.clients[name].filter(p => p.date !== date);
//                 this.clients[name] = this.clients[name].filter(p => p.status !== date);
//             },
//             getAppointments: function(name, status){//función para conseguir las citas de una persona o una persona con su status
//                 if(status){
//                     return this.clients[name].filter(p => p.status === status);
//                 }else{
//                     return this.clients[name];
//                 }
//             },
//             getClients: function(){//función para obtener los clientes del objeto clients
//                 return Object.keys(this.clients);
//             }
//         };

// server.use(bodyParser.json());

// server.get('/api', (req, res) => {
//     res.send(model.clients);
// });

// server.post('/api/Appointments', (req, res) => {
//     const {client, appointment} = req.body;

//     if(!client){
//         return res.status(400).send('the body must have a client property');
//     };
//     if(typeof client !== 'string'){
//         return res.status(400).send('client must be a string');
//     };

//     model.addAppointment(client, appointment);

//     res.send({date: appointment.date, status: 'pending'})
// });

// server.get('/api/Appointments/:name', (req, res) => {
//     const name = req.params.name;
//     const date = req.query.date;
//     const status = req.query.option;
//     const client = model.clients[name];

//     //VERIFICA QUE EXISTA EL CLIENTE
//     if(!client) {
//         return res.status(400).send('the client does not exist')
//     }

//     //VERIFICA QUE TENGA CITA EL CLIENTE
//     const appointment = client.find(e => e.date === date)

//     if (!appointment) {
//         return res.status(400).send('the client does not have a appointment for that date')
//     }

//     switch (status) {
//         case "attend":
//             model.attend(name, date);
//             return res.send(appointment);
//         case "expire":
//             model.expire(name, date);
//             return res.send(appointment);
//         case "cancel":
//             model.cancel(name, date);
//             return res.send(appointment);
//         default:
//             res.status(400).send('the option must be attend, expire or cancel');
//             break;
//     }

// });

// server.get('/api/Appointments/:name/erase', (req, res) => {
//     const name = req.params.name;
//     const date = req.query.date;
//     const client = model.clients[name];

//     if(!client) {
//         return res.status(400).send('the client does not exist')
//     }

//     const eDelete  = model.erase(name, date);

//     res.send(eDelete);
// })

// server.get('/api/Appointments/getAppointments/:name', (req, res) => {
//     const name = req.params.name;
//     const status = req.query.status;

//     res.send(model.getAppointments(name, status));
// })

// server.listen(3000);
// module.exports = { model, server };
