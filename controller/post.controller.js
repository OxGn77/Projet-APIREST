
const Pub = require('../model/pub.model.js');
const Com = require('../model/com.model.js');

exports.getAll = async (req, res) => {
  try {
    const listPost = await Pub.findAll({
      order: [
        ['createdAt', 'DESC'],
        [{ model: Com, as: 'comments' }, 'createdAt', 'ASC'] 
      ],
      include: [
        { 
          model: Com, 
          as: 'comments' 
        }
      ]
    });

    return res.status(200).json(listPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newPost = await Pub.create({
      content: req.body.content,
      userId: req.payload?.userId 
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
  
    const targetPost = await Pub.findByPk(req.params.id);

    if (!targetPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Com.create({
      content: req.body.content,
      postId: targetPost.id,
      userId: req.payload?.userId || req.user?.id // Récupération de l'ID depuis le middleware
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};