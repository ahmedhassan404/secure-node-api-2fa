const { pool } = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateTwoFactorSecret } = require('../utils/twoFactorAuth');

class User {
  static async create(username, password) {
    try {
      const hashedPassword = await hashPassword(password);
    
      const twoFASecret = generateTwoFactorSecret()

      const [result] = await pool.execute(
        'INSERT INTO users (username, password, twofa_secret) VALUES (?, ?, ?)', 
        [username, hashedPassword, twoFASecret.base32]
      );
      
      return {
        id: result.insertId,
        username: username,
        twoFASecret: twoFASecret
      };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async findByUsername(username) {
    try {
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE username = ?', 
        [username]
      );
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  static async validateCredentials(username, password, twoFactorToken) {
    try {

      const user = await this.findByUsername(username);
      
      if (!user) {
        return null;
      }
      
      const isPasswordValid = await comparePassword(password, user.password);
      
      if (!isPasswordValid) {
        return null;
      }
      
      return user;
    } catch (error) {
      throw new Error(`Error validating credentials: ${error.message}`);
    }
  }

  static async update(id, updateData) {
    try {
      const fields = [];
      const values = [];
      
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
        fields.push('password = ?');
        values.push(updateData.password);
      }
      
      if (updateData.twofa_secret) {
        fields.push('twofa_secret = ?');
        values.push(updateData.twofa_secret);
      }
      
      values.push(id);
      
      if (fields.length === 0) {
        return false;
      }
      
      const [result] = await pool.execute(
        `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?', 
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = User;