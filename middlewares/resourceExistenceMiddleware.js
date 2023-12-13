const knex = require("knex")(require("../knexfile"));

const isJarExists = async (req, res, next) => {
    try {
        const jar = await knex("jar")
            .select("*")
            .where({ id: req.params.jarid });

        if (jar.length === 0) {
            return res.status(404).json({ message: "Jar id not found in database" });
        }
        req.jar = jar[0];
        return next();
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    isJarExists
};