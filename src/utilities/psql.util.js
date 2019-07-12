import pool from '../models/index.model';

export default class Query {
  constructor(table) {
    this.pool = pool;
    this.table = table;
  }

  /**
   * Find all documents in a table
   * @param {param}
   */
  async findAll(selector) {
    const query = `SELECT ${selector} FROM ${this.table}`;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Find a specific document by a param
   * @param {param}
   */
  async findByOneParam(paramType, param) {
    const query = `SELECT * FROM ${this.table} WHERE ${paramType}=$1`;
    try {
      const response = await this.pool.query(query, param);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Find a specific document by multiple params
   * @param {param}
   */

  async findByMultipleParam(
    selector1,
    selector2,
    selector3,
    selector4,
    values,
  ) {
    const query = `SELECT * FROM ${
      this.table
    } WHERE ${selector1}=$1 AND ${selector2}=$2 AND ${selector3}=$3 AND ${selector4}=$4`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Insert into db
   * @param {bodyObject}
   */
  async insertIntoDB(columns, selector, values) {
    const query = `INSERT INTO ${
      this.table
    } (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Insert into db
   * @param {bodyObject}
   */
  async insertWithSelect(columns, values, selector, secondTable, row, id) {
    const query = `INSERT INTO
    ${this.table} (${columns})
      (SELECT ${values}, ${selector} FROM ${secondTable} WHERE ${row}=${id}) RETURNING *;`;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Insert into db
   * @param {bodyObject}
   */
  async findTripBooking(columns, secondTable, values) {
    const query = `SELECT *
    FROM ${secondTable}
    LEFT JOIN (SELECT seat_number FROM ${this.table}) AS B
    ON ${secondTable}.${columns}=$1
    WHERE ${secondTable}.${columns}=$1`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
