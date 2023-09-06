const Sequelize = require('sequelize');

const sequelize = new Sequelize('my-posts-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
    })


const User = sequelize.define("users", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 20],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 20],
    },
  },
  emailId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      }
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: [5, 20],
        }
  },
});

const Post = sequelize.define("posts", {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    likeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dislikeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    addedByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

const Comment = sequelize.define("comments", {
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    addedByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = { User, Post, Comment };