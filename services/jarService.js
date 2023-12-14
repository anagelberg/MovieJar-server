const knex = require("knex")(require("../knexfile"));;

const getJar = async (jarId) => {
    return await knex("jar").select("*").where({ id: jarId });
};

const getJarContributors = async (jarId) => {
    const jarContributors = await knex("jar_user_join")
        .select("user_id as userId")
        .where({ jar_id: jarId });
    return jarContributors.map((contributor) => contributor.userId);
};


const getJarsByUserId = async (userId) => {
    return await knex("jar_user_join")
        .select("jar_id as jarId", "name", "creator_id as creatorId")
        .where({ user_id: userId })
        .join("jar", "jar.id", "=", "jar_user_join.jar_id")
}


module.exports = { getJar, getJarContributors, getJarsByUserId };