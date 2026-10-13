const db = require("./db");

const FIELDS = [
  "fld_firstname",
  "fld_middlename",
  "fld_lastname",
  "fld_extname",
  "fld_email",
  "fld_username",
];

const User = {
  async all() {
    const [rows] = await db.execute("SELECT * FROM info_users");
    return rows;
  },

  async find(id) {
    const [rows] = await db.execute("SELECT * FROM info_users WHERE fld_id=?",[id]);
    return rows;
  }
}

module.exports = User;