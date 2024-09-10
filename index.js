const express = require("express");

const app = express();
const fs= require("node:fs/promises");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersWrite =async ()=> {
    await fs.writeFile('userBase.json','[\n' +
        '  {"id": "1", "name": "Maksym", "email": "feden@gmail.com", "password": "qwe123"},\n' +
        '  {"id": "2", "name": "Alina", "email": "alindosik@gmail.com", "password": "ert345"},\n' +
        '  {"id": "3", "name": "Anna", "email": "ann43@gmail.com", "password": "ghj393"},\n' +
        '  {"id": "4", "name": "Tamara", "email": "tomochka23@gmail.com", "password": "afs787"},\n' +
        '  {"id": "5", "name": "Dima", "email": "taper@gmail.com", "password": "rtt443"},\n' +
        '  {"id": "6", "name": "Rita", "email": "torpeda@gmail.com", "password": "vcx344"},\n' +
        '  {"id": "7", "name": "Denis", "email": "denchik@gmail.com", "password": "sdf555"},\n' +
        '  {"id": "8", "name": "Sergey", "email": "BigBoss@gmail.com", "password": "ccc322"},\n' +
        '  {"id": "9", "name": "Angela", "email": "lala@gmail.com", "password": "cdd343"},\n' +
        '  {"id": "10", "name": "Irina", "email": "irka7@gmail.com", "password": "kkk222"}\n' +
        ']')
}
void usersWrite();
app.get('/users', (req, res) => {
    try {
        const usersRead=async ()=>{
            const users= JSON.parse(await fs.readFile('userBase.json','utf-8'))
            res.send(users);
        }
        void usersRead();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/users', (req, res) => {
    try {
        const usersRead=async ()=>{
            const users= JSON.parse(await fs.readFile('userBase.json','utf-8'))
            const {name, email, password} = req.body;
            if (password.length<8){
                return res.status(400).send("Too weak password");
            }
            const id = Number(users[users.length - 1].id) + 1;
            const newUser = {id, name, email, password};
            users.push(newUser);
            await fs.writeFile('userBase.json',`${JSON.stringify(users)}`);
            res.status(201).send(newUser);
        }
        void usersRead();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/users/:userId', (req, res) => {
    try {
        const usersRead=async ()=>{
            const users= JSON.parse(await fs.readFile('userBase.json','utf-8'))
            const userId = Number(req.params.userId);
            const user = users.find(user => Number(user.id) === userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.send(user);
        }
        void usersRead();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put('/users/:userId', (req, res) => {
    try {
        const usersRead=async ()=>{
            const users= JSON.parse(await fs.readFile('userBase.json','utf-8'))
            const userId = Number(req.params.userId);
            const userIndex = users.findIndex(user => Number(user.id) === userId);
            if (userIndex === -1) {
                return res.status(404).send('User not found');
            }
            const {name, email, password} = req.body;
            if (password.length<8){
                return res.status(400).send("Too weak password");
            }
            users[userIndex] = {...users[userIndex], name, email, password};
            await fs.writeFile('userBase.json',`${JSON.stringify(users)}`);
            res.status(201).send(users[userIndex]);
        }
        void usersRead();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', (req, res) => {
    try {
        const usersRead=async ()=>{
            const users= JSON.parse(await fs.readFile('userBase.json','utf-8'))
            const userId = Number(req.params.userId);
            const userIndex = users.findIndex(user => Number(user.id) === userId);
            if (userIndex === -1) {
                return res.status(404).send('User not found');
            }
            users.splice(userIndex, 1);
            await fs.writeFile('userBase.json',`${JSON.stringify(users)}`);
            res.sendStatus(204);
        }
        void usersRead();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});