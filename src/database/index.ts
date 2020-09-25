import { createConnection, Connection } from "typeorm";

class Database {
  async MySQL(database = 'default'): Promise<Connection> {
    return createConnection({
      type: "mysql",
      host: process.env.RDS_HOSTNAME || "localhost",
      username: process.env.RDS_USERNAME || "root",
      password: process.env.RDS_PASSWORD || "",
      port: parseInt(process.env.RDS_PORT) || 3306,
      database: "peruibemelhor",
      synchronize: false,
      logging: !process.env.RDS_HOSTNAME,
      entities: [
        "src/entity/**/*.ts"
      ],
      migrations: [
        "src/database/migration/**/*.ts"
      ],
      subscribers: [
        "src/subscriber/**/*.ts"
      ]
    });
  }
}

export default new Database();