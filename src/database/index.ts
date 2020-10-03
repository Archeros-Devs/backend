import { createConnection, Connection } from "typeorm";

class Database {
  async MySQL(): Promise<Connection> {
    return createConnection({
      type: "mysql",
      host: process.env.RDS_HOSTNAME || "localhost",
      username: process.env.RDS_USERNAME || "root",
      password: process.env.RDS_PASSWORD || "",
      port: parseInt(process.env.RDS_PORT) || 3306,
      database: process.env.RDS_HOSTNAME || "peruibemelhor",
      synchronize: false,
      logging: process.env.NODE_ENV != 'production',
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