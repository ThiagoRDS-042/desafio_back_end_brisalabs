import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePixKeysTable1651055633228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pix_keys",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "key",
            type: "varchar(100)",
            isUnique: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "pix_keys",
      new TableForeignKey({
        name: "pix_keys_user_id_foreign_key",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "pix_keys",
      "pix_keys_user_id_foreign_key"
    );
    await queryRunner.dropTable("pix_keys");
  }
}
