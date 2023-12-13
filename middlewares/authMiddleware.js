const knex = require("knex")(require("../knexfile"));

const isAuthenticated = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({ message: 'User not Authenticated. Please log in.' });
        }
    } catch (err) {
        console.log('error authenticating user', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const isRequestingOwnResource = (req, res, next) => {
    try {
        if (String(req.user.id) === String(req.params.userid)) {
            return next();
        }
        res.status(403)
            .json({ message: 'Not Authorized. User param id and authentication mismatch.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

const isJarContributor = async (req, res, next) => {
    try {
        const jarContributor = await knex("jar_user_join")
            .select("*")
            .where({
                jar_id: req.jar.id,
                user_id: req.user.id
            });

        if (jarContributor.length === 0) {
            return res.status(403).json({ message: "Not Authorized. User is not a contributor to that jar." });
        }

        return next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {
    isAuthenticated,
    isRequestingOwnResource,
    isJarContributor,
};