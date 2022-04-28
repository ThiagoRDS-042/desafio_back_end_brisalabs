import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTransactionsTable1651072835351
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "amount",
            type: "double precision",
          },
          {
            name: "pixKey_key_from",
            type: "varchar(100)",
          },
          {
            name: "pixKey_key_to",
            type: "varchar(100)",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "transactions_pixKey_key_from_foreign_key",
        columnNames: ["pixKey_key_from"],
        referencedColumnNames: ["key"],
        referencedTableName: "pix_keys",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "transactions_pixKey_key_to_foreign_key",
        columnNames: ["pixKey_key_to"],
        referencedColumnNames: ["key"],
        referencedTableName: "pix_keys",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "transactions",
      "transactions_pixKey_key_from_foreign_key"
    );
    await queryRunner.dropForeignKey(
      "transactions",
      "transactions_pixKey_key_to_foreign_key"
    );
    await queryRunner.dropTable("transactions");
  }
}
