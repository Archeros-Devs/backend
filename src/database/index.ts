import { createConnection, Connection } from "typeorm";

class Database {
  async MySQL(database = 'default'): Promise<Connection> {
    return createConnection(database)
  }
}

export default new Database();