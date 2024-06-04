import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: `varchar`, length: 30})
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 15})
    username?: string;
    
    @Column({type: 'varchar', length: 40,})
    email: string;

    @Column({type: 'int', nullable: true})
    age?: number;

    @Column({type:'varchar'})
    password: string; 

    @Column({ type: 'enum', nullable: true, enum: ['m', 'f', 'u']})
    gender?: string;
}

// @Entity('users')
// export class User1 {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column({unique: true})
//     email: string;

//     @Column()
//     password: string;
// }

