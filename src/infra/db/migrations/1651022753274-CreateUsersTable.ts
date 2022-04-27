import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1651022753274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "email",
            type: "varchar(100)",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar(100)",
          },
          {
            name: "phone",
            type: "varchar(20)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
