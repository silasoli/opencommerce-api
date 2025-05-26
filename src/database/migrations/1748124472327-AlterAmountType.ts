import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAmountType1748124472327 implements MigrationInterface {
  name = 'AlterAmountType1748124472327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" integer NOT NULL`,
    );
  }
}
