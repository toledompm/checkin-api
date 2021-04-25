import { User } from 'src/user/domain/user.entity';
import { UserServiceImpl } from 'src/user/user.service.impl';

describe('UserServiceImpl', () => {
  const userServiceImpl = new UserServiceImpl();

  describe('getHello', () => {
    let res: string;
    beforeEach(() => {
      res = userServiceImpl.getHello();
    });

    it('should return welcome message', () => {
      expect(res).toEqual('Hello User!');
    });
  });

  describe('saveUser', () => {
    const userData = {
      email: 'jeff.marduk@mail.com',
      firstName: 'Jeff',
      lastName: 'Marduk',
    };

    const anonUser = {};

    let users: User[];

    beforeEach(() => {
      userServiceImpl.saveUser(userData);
      userServiceImpl.saveUser(anonUser);

      users = (userServiceImpl as any).users;
    });

    it('should have saved both users', () => {
      expect(users).toContainEqual(
        expect.objectContaining({ id: expect.any(Number), ...userData }),
      );

      expect(users).toContainEqual(
        expect.objectContaining({ id: expect.any(Number), firstName: 'anon' }),
      );
    });
  });
});
