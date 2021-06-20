import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { User } from 'src/user/domain/user.entity';
import { UserServiceImpl } from 'src/user/user.service.impl';

describe('UserServiceImpl', () => {
  const repositoryMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const cacheMock = {
    store: jest.fn(),
    delete: jest.fn(),
  };

  const userServiceImpl = new UserServiceImpl(
    repositoryMock as any,
    cacheMock as any,
  );

  const userData = {
    email: 'jeff.marduk@mail.com',
    firstName: 'Jeff',
    lastName: 'Marduk',
  };

  const instantiatedUser = new User(userData);

  describe('saveUser', () => {
    let user: User;
    repositoryMock.save.mockResolvedValue(instantiatedUser);
    beforeAll(async () => {
      user = await userServiceImpl.saveUser(userData);
    });

    it('should have called userRepository.save', () => {
      expect(repositoryMock.save).toHaveBeenCalledWith(instantiatedUser);
    });

    it('should have returned an user', () => {
      expect(user).toEqual(instantiatedUser);
    });
  });

  describe('getUser', () => {
    let user: User;
    const id = 1;
    repositoryMock.findOne.mockResolvedValue({ ...instantiatedUser, id });
    beforeAll(async () => {
      user = await userServiceImpl.getUser(id);
    });

    it('should have called userRepository.find', () => {
      expect(repositoryMock.findOne).toHaveBeenCalledWith(id);
    });

    it('should have returned an user', () => {
      expect(user).toEqual(expect.objectContaining(instantiatedUser));
    });
  });

  describe('findUser', () => {
    let user: User;
    const filters = { email: userData.email };
    repositoryMock.findOne.mockResolvedValue(instantiatedUser);
    beforeAll(async () => {
      user = await userServiceImpl.findUser(filters);
    });

    it('should have called userRepository.find', () => {
      expect(repositoryMock.findOne).toHaveBeenCalledWith(filters);
    });

    it('should have returned an user', () => {
      expect(user).toEqual(instantiatedUser);
    });
  });

  describe('generateCheckinToken', () => {
    let token: UserCheckinDto;

    const expectedToken = expect.stringMatching(
      /[\w]{8}(-[\w]{4}){3}-[\w]{12}/,
    );

    beforeAll(async () => {
      token = await userServiceImpl.generateCheckinToken(instantiatedUser);
    });

    it('should store the user cache', () => {
      const { uuid, role } = instantiatedUser;
      expect(cacheMock.store).toHaveBeenCalledWith({
        key: expectedToken,
        value: { uuid, role },
      });
    });

    it('should return the correct token', () => {
      expect(token).toEqual({ refreshToken: expectedToken });
    });
  });

  describe('refreshCheckinToken', () => {
    const token = new UserCheckinDto({ refreshToken: 'aaa-bbb-ccc' });
    beforeAll(async () => {
      await userServiceImpl.refreshCheckinToken(token);
    });

    it('should have called cache.delete with the provided token', () => {
      expect(cacheMock.delete).toHaveBeenCalledWith(token.refreshToken);
    });
  });
});
