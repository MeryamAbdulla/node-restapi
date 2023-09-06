const { Post, Comment } = require("../config/db.config");

exports.addPost = async (req, res) => {
  try {
    const { description, imagePath, addedByUserId, likeCount, dislikeCount } = req.body;
    const newPost = await Post.create({
      description,
      imagePath,
      addedByUserId,
      likeCount,
      dislikeCount,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Post kaydı hatası:", error);
    res.status(500).json({ error: "Post kaydı sırasında bir hata oluştu." });
  }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error("Post listeleme hatası:", error);
        res.status(500).json({ error: "Post listeleme sırasında bir hata oluştu." });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({
            where: {
                id,
            },
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post bulunamadı." });
        }
    }
    catch (error) {
        console.error("Post listeleme hatası:", error);
        res.status(500).json({ error: "Post listeleme sırasında bir hata oluştu." });
    }
}

exports.addPostComment = async (req, res) => {
    try {
        const { comment, postId, addedByUserId } = req.body;
        const newComment = await Comment.create({
            comment,
            postId,
            addedByUserId,
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Yorum kaydı hatası:", error);
        res.status(500).json({ error: "Yorum kaydı sırasında bir hata oluştu." });
    }
}

exports.getPostComment = async (req, res) => {
    try {
        const { postId } = req.query;
        const comments = await Comment.findAll({
            where: {
                postId,
            },
        });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error("Yorum listeleme hatası:", error);
        res.status(500).json({ error: "Yorum listeleme sırasında bir hata oluştu." });
    }
}

exports.likePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const post = await Post.findOne({
          where: {
            id: postId,
          },
        });
        if (post) {
            const likeCount = post.likeCount + 1;
            await Post.update(
              { likeCount },
              {
                where: {
                  id: postId,
                },
              }
            );
            res.status(200).json({ message: "Post beğenildi." });
        } else {
            res.status(404).json({ error: "Post bulunamadı." });
        }
    }
    catch (error) {
        console.error("Post beğenme hatası:", error);
        res.status(500).json({ error: "Post beğenme sırasında bir hata oluştu." });
    }
}

exports.dislikePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const post = await Post.findOne({
          where: {
            id: postId,
          },
        });
        if (post) {
            const dislikeCount = post.dislikeCount + 1;
            await Post.update(
              { dislikeCount },
              {
                where: {
                  id: postId,
                },
              }
            );
            res.status(200).json({ message: "Post beğenilmedi." });
        } else {
            res.status(404).json({ error: "Post bulunamadı." });
        }
    }
    catch (error) {
        console.error("Post beğenmeme hatası:", error);
        res.status(500).json({ error: "Post beğenmeme sırasında bir hata oluştu." });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const post = await Post.findOne({
          where: {
            id: postId,
          },
        });
        if (post) {
            await Post.destroy({
                where: {
                    id: postId,
                },
            });
            res.status(200).json({ message: "Post silindi." });
        } else {
            res.status(404).json({ error: "Post bulunamadı." });
        }
    }
    catch (error) {
        console.error("Post silme hatası:", error);
        res.status(500).json({ error: "Post silme sırasında bir hata oluştu." });
    }
}