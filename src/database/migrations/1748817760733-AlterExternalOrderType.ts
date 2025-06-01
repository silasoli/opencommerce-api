import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExternalOrderType1748817760733 implements MigrationInterface {
  name = 'AlterExternalOrderType1748817760733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" ADD "paymentDetails" jsonb`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "orderData" jsonb`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "paymentData" jsonb`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "shippingData" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "shippingData" text`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "paymentData" text`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderData"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "orderData" text`);
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "paymentDetails"`,
    );
  }
}
