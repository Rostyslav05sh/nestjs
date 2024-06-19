import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedLikesTable1718800096440 implements MigrationInterface {
    name = 'EditedLikesTable1718800096440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "deviceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" ADD "deviceId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "refreshToken" text NOT NULL`);
    }

}
