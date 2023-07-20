// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Set middleware
app.use(bodyParser.json());

// Set route
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        }
        res.send(JSON.parse(data));
    });
});

// Set route
app.post('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        }
        const comments = JSON.parse(data);
        const newComment = {
            id: comments.length + 1,
            ...req.body,
        };
        comments.push(newComment);
        fs.writeFile(
            './data/comments.json',
            JSON.stringify(comments),
            (err) => {
                if (err) {
                    res.status(500).send('Server error');
                }
                res.status(201).send(newComment);
            }
        );
    });
});

// Set route
app.put('/comments/:id', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        }
        const comments = JSON.parse(data);
        const newComments = comments.map((comment) => {
            if (comment.id === parseInt(req.params.id)) {
                return {
                    ...comment,
                    ...req.body,
                };
            }
            return comment;
        });
        fs.writeFile(
            './data/comments.json',
            JSON.stringify(newComments),
            (err) => {
                if (err) {
                    res.status(500).send('Server error');
                }
                res.status(200).send(newComments);
            }
        );
    });
});

// Set route
app.delete('/comments/:id', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        }
        const comments = JSON.parse(data);
        const newComments = comments