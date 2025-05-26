import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExternalIdsInOrdersTable1748225460875
  implements MigrationInterface
{
  name = 'AddExternalIdsInOrdersTable1748225460875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "nuvemshop_order_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_4a36b1b7a06e7a3bfffeaf150e8" UNIQUE ("nuvemshop_order_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "asaas_order_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "UQ_1a98647ecc7a16077b502c24b5b" UNIQUE ("asaas_order_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "UQ_1a98647ecc7a16077b502c24b5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "asaas_order_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "UQ_4a36b1b7a06e7a3bfffeaf150e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "nuvemshop_order_id"`,
    );
  }
}
