import Module from '../models/Module.js';

export const listModules = async (req, res, next) => {
  try {
    const modules = await Module.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(modules);
  } catch (err) {
    next(err);
  }
};

export const getModule = async (req, res, next) => {
  try {
    const mod = await Module.findById(req.params.id);
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    res.json(mod);
  } catch (err) {
    next(err);
  }
};

export const createModule = async (req, res, next) => {
  try {
    const mod = await Module.create(req.body);
    res.status(201).json(mod);
  } catch (err) {
    next(err);
  }
};

export const updateModule = async (req, res, next) => {
  try {
    const mod = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    res.json(mod);
  } catch (err) {
    next(err);
  }
};

export const deleteModule = async (req, res, next) => {
  try {
    const mod = await Module.findByIdAndDelete(req.params.id);
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
