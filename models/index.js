const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
const slugify = title => title.replace(/\s+/g, '_').replace(/\W/g, '');

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open',
    }
})

Page.beforeValidate((page, options) => {
    page.slug = slugify(page.title)
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    }
})

module.exports = { db, Page, User }
