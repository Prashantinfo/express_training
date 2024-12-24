const express = require('express');
const router = express.Router();
const Idea = require('../model/ideaModel');
const userModel = require('../model/userModel');
const userExistsMiddleware = require('../middleware/userExist');

router.post('/', userExistsMiddleware, async (req, res) => {
    const { title, description, userId } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newIdea = await Idea.create({ title, description, user: userId });
        res.status(201).json(newIdea);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const ideas = await Idea.find({ user: userId });
        res.status(200).json(ideas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idea = await Idea.findById(id);
        if (!idea) return res.status(404).json({ error: 'Idea not found' });
        res.status(200).json(idea);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const idea = await Idea.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!idea) return res.status(404).json({ error: 'Idea not found' });

        res.status(200).json(idea);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const idea = await Idea.findByIdAndDelete(id);
        if (!idea) return res.status(404).json({ error: 'Idea not found' });

        res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
