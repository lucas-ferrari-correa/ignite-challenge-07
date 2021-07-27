import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1627361180884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
            },
            {
              name: "usersId",
              type: "varchar",
            },
            {
              name: "gamesId",
              type: "varchar",
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
