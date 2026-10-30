const post = require('./../model/post.model.js');

exports.getAll = async (req, res) => {
  try {
    const listPost = await post.findAll({
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'ASC']
      ],
      include: [{ model: Comment }]
    });
    res.status(200).json(listPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const post = await post.create({
        content : req.body.content,
        userId : req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
};
}

exports.addComment = async (req, res) => {
  try {
    const post = await post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = await Comment.create({
      content: req.body.content,
      postId: post.id,
      userId: req.user.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
