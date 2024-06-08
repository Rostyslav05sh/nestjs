import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddresToUser1717848570366 implements MigrationInterface {
    name = 'AddAddresToUser1717848570366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }

}
