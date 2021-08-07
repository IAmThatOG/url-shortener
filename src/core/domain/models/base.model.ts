import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class BaseModel {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @CreateDateColumn({ name: 'date_created', type: 'timestamp' })
    dateCreated?: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'timestamp' })
    dateUpdated?: Date;

    @VersionColumn({ name: 'row_version', type: 'int', unsigned: true })
    rowVersion: number;
}