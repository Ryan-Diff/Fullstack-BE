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

    static async find() {
        const { rows } = await pool.query(
            `SELECT * FROM plants`
        );
        return rows.map(row => new Plant(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
          'SELECT * FROM plants WHERE id=$1',
          [id]
        );
      
        if(!rows[0]) return null;
        else return new Plant(rows[0]);
      }

      static async update(id, plant) {
        const { rows } = await pool.query(
          `UPDATE plants
             SET name=$1,
                 common_name=$2,
                 description=$3,
                 water_needs=$4,
                 image_url=$5
             WHERE id=$6
             RETURNING *
            `,
          [plant.name, plant.commonName, plant.description, plant.waterNeeds, plant.imageUrl, id]
        );
      
        return new Plant(rows[0]);
      }

      static async delete(id) {
        const { rows } = await pool.query(
          'DELETE FROM plants WHERE id=$1 RETURNING *',
          [id]
        );
      
        return new Plant(rows[0]);
      }
};    
