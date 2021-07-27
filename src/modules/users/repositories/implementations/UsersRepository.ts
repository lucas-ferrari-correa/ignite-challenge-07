import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const foundUser = this.repository.findOneOrFail({
      where: {
        id: user_id
      },
      relations: ['games', 'games.users']
    });
    return foundUser;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`
      SELECT
        *
      FROM
        users
      ORDER BY
        first_name
    `); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`
      SELECT
        email,
        first_name,
        last_name
      FROM
        users
      WHERE
        UPPER(first_name) = UPPER('${first_name}')
        AND UPPER(last_name) = UPPER('${last_name}')
    `); // Complete usando raw query
  }
}
