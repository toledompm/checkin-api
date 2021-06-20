import { CheckinServiceImpl } from 'src/checkin/checkin.service.impl';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { User } from 'src/user/domain/user.entity';

describe('CheckinServiceImpl', () => {
  const checkinRepositoryMock = { save: jest.fn() };
  const userServiceMock = {
    findUser: jest.fn(),
    generateCheckinToken: jest.fn(),
    refreshCheckinToken: jest.fn(),
  };
  const cacheMock = {
    find: jest.fn(),
  };

  const checkinService = new CheckinServiceImpl(
    checkinRepositoryMock as any,
    userServiceMock as any,
    cacheMock as any,
  );

  const userData = {
    uuid: 'aaa-bbbb-ccc-2',
    refreshToken: 'aaa-bbbb-ccc-2',
  };

  const userCheckinDto = new UserCheckinDto(userData);
  const user = new User(userData);
  const expectedCacheKey = userCheckinDto.refreshToken;

  userServiceMock.findUser.mockResolvedValue(user);

  describe('checkinUser', () => {
    describe('when the token is invalid', () => {
      beforeAll(async () => {
        jest.clearAllMocks();
        const expectedError = 'Cache Entry not Found!';
        cacheMock.find.mockRejectedValue(new Error(expectedError));
        await expect(
          checkinService.checkinUser(userCheckinDto),
        ).rejects.toThrow(expectedError);
      });

      it('should have called cache.find', () => {
        expect(cacheMock.find).toHaveBeenCalledWith(expectedCacheKey);
      });

      it('should not have called findUser', () => {
        expect(userServiceMock.findUser).not.toHaveBeenCalled();
      });

      it('should not have called refreshCheckinToken', () => {
        expect(userServiceMock.refreshCheckinToken).not.toHaveBeenCalled();
      });

      it('should not have called checkinRepository.save', () => {
        expect(checkinRepositoryMock.save).not.toHaveBeenCalled();
      });
    });

    describe('when the token is valid', () => {
      beforeAll(async () => {
        jest.clearAllMocks();
        cacheMock.find.mockResolvedValue({
          key: expectedCacheKey,
          value: { uuid: userData.uuid },
        });
        await checkinService.checkinUser(userCheckinDto);
      });

      it('should have called cache.find', () => {
        expect(cacheMock.find).toHaveBeenCalledWith(expectedCacheKey);
      });

      it('should have called findUser', () => {
        const { uuid } = userData;
        expect(userServiceMock.findUser).toHaveBeenCalledWith({ uuid });
      });

      it('should have called refreshCheckinToken', () => {
        expect(userServiceMock.refreshCheckinToken).toHaveBeenCalledWith(
          userCheckinDto,
        );
      });

      it('should have called checkinRepository.save', () => {
        expect(checkinRepositoryMock.save).toHaveBeenCalledWith({ user });
      });
    });
  });
});
