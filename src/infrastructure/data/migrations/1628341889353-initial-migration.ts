import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1628341889353 implements MigrationInterface {
    name = 'initialMigration1628341889353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`url_shortener\`.\`url\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`date_created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`date_updated\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`row_version\` int UNSIGNED NOT NULL, \`host\` varchar(255) NOT NULL, \`long_url\` varchar(255) NOT NULL, \`short_code\` varchar(255) NOT NULL, \`number_of_visit\` int NOT NULL, \`date_added\` varchar(255) NOT NULL, \`last_visit\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`url_shortener\`.\`url\``);
    }

}
