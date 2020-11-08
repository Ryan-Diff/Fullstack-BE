const pool = require('../utils/pool');

module.exports = class Plant {
    id;
    name;
    commonName;
    description;
    waterNeeds;
    imageUrl;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.commonName = row.common_name;
        this.description = row.description;
        this.waterNeeds = row.water_needs;
        this.imageUrl = row.image_url;
    }

    static async insert(plants) {
        const { rows } = await pool.query(
           `INSERT into plants (
               name, common_name, description, water_needs, image_url)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`,
               [plants.name, plants.commonName, plants.description, plants.waterNeeds, plants.imageUrl]
        );
        return new Plant(rows[0]);
    }
};    
