const { pool } = require('../config/database');

class Product {
  static async create(productData) {
    try {
      const { name, description, price, quantity } = productData;
      
      const [result] = await pool.execute(
        'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
        [name, description, price, quantity]
      );
      
      return {
        id: result.insertId,
        ...productData
      };
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  static async findAll() {
    try {
      const [products] = await pool.execute('SELECT * FROM products');
      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }
  static async findById(id) {
    try {
      const [products] = await pool.execute(
        'SELECT * FROM products WHERE id = ?', 
        [id]
      );
      
      return products.length > 0 ? products[0] : null;
    } catch (error) {
      throw new Error(`Error finding product: ${error.message}`);
    }
  }

  static async update(id, updateData) {
    try {
      const { name, description, price, quantity } = updateData;
      
      const [result] = await pool.execute(
        'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?',
        [name, description, price, quantity, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  static async partialUpdate(id, updateData) {
    try {
      const fields = [];
      const values = [];
        if (updateData.name) {
        fields.push('name = ?');
        values.push(updateData.name);
      }
      
      if (updateData.description) {
        fields.push('description = ?');
        values.push(updateData.description);
      }
      
      if (updateData.price !== undefined) {
        fields.push('price = ?');
        values.push(updateData.price);
      }
      
      if (updateData.quantity !== undefined) {
        fields.push('quantity = ?');
        values.push(updateData.quantity);
      }
      values.push(id);
      
      if (fields.length === 0) {
        return false;
      }
      
      const [result] = await pool.execute(
        `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error partially updating product: ${error.message}`);
    }
  }

 static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM products WHERE id = ?', 
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
  static async search(query) {
    try {
      const [products] = await pool.execute(
        'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?', 
        [`%${query}%`, `%${query}%`]
      );
      
      return products;
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = Product;