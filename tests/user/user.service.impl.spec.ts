import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserServiceImpl } from 'src/user/user.service.impl';

describe('UserServiceImpl', () => {
  const repositoryMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const userServiceImpl = new UserServiceImpl(repositoryMock as any);

  const userData = {
    email: 'jeff.marduk@mail.com',
    firstName: 'Jeff',
    lastName: 'Marduk',
  };

  const instantiatedUser = new User(userData);

  describe('saveUser', () => {
    let user: User;
    repositoryMock.save.mockResolvedValue(instantiatedUser);
    beforeEach(async () => {
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
    beforeEach(async () => {
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
    repositoryMock.find.mockResolvedValue([instantiatedUser]);
    beforeEach(async () => {
      user = await userServiceImpl.findUser(filters);
    });

    it('should have called userRepository.find', () => {
      expect(repositoryMock.find).toHaveBeenCalledWith(filters);
    });

    it('should have returned an user', () => {
      expect(user).toEqual(instantiatedUser);
    });
  });

  describe('generateCheckinToken', () => {
    let token: UserRefreshCheckinToken;

    const expectedToken = new UserRefreshCheckinToken(instantiatedUser);
    beforeEach(async () => {
      token = await userServiceImpl.generateCheckinToken(instantiatedUser);
    });

    it('should return the correct token', () => {
      expect(token).toEqual(expectedToken);
    });
  });
});
