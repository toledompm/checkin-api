import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User, UserRole } from 'src/user/domain/user.entity';
import { UserServiceImpl } from 'src/user/user.service.impl';

describe('UserServiceImpl', () => {
  const userServiceImpl = new UserServiceImpl();

  describe('saveUser', () => {
    const userData = {
      email: 'jeff.marduk@mail.com',
      firstName: 'Jeff',
      lastName: 'Marduk',
    };

    let users: User[];

    beforeEach(() => {
      userServiceImpl.saveUser(userData);
      users = (userServiceImpl as any).users;
    });

    it('should have saved both users', () => {
      expect(users).toContainEqual(
        expect.objectContaining({ id: expect.any(Number), ...userData }),
      );
    });
  });

  describe('generateCheckinToken', () => {
    let token: UserRefreshCheckinToken;

    const userData = {
      email: 'jeff.marduk@mail.com',
      firstName: 'Jeff',
      lastName: 'Marduk',
      id: 1,
      uuid: 'string',
      role: UserRole.MEMBER,
    };

    const user = new User(userData);

    const expectedToken = new UserRefreshCheckinToken(user);
    beforeEach(async () => {
      token = await userServiceImpl.generateCheckinToken(user);
    });

    it('should return the correct token', () => {
      expect(token).toEqual(expectedToken);
    });
  });
});
