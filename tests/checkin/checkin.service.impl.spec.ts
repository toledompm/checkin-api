import { CheckinServiceImpl } from 'src/checkin/checkin.service.impl';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';

describe('CheckinServiceImpl', () => {
  const checkinRepositoryMock = { save: jest.fn() };
  const userServiceMock = {
    findUser: jest.fn(),
    generateCheckinToken: jest.fn(),
    refreshCheckinToken: jest.fn(),
  };
  const checkinService = new CheckinServiceImpl(
    checkinRepositoryMock as any,
    userServiceMock as any,
  );

  const userData = {
    uuid: 'aaa-bbbb-ccc-2',
    refreshToken: { token: 'BananaApplePineapple' } as UserRefreshCheckinToken,
  };

  const userCheckinDto = new UserCheckinDto(userData);
  const user = new User(userData);

  userServiceMock.findUser.mockResolvedValue(user);

  describe('checkinUser', () => {
    describe('when the token is invalid', () => {
      beforeAll(async () => {
        jest.clearAllMocks();
        const expectedError = 'Invalid Refresh Token!';
        userServiceMock.generateCheckinToken.mockResolvedValue({
          token: 'SomeRandomToken',
        });
        await expect(
          checkinService.checkinUser(userCheckinDto),
        ).rejects.toThrow(expectedError);
      });

      it('should have called findUser', () => {
        const { uuid } = userData;
        expect(userServiceMock.findUser).toHaveBeenCalledWith({ uuid });
      });

      it('should have called generateCheckinToken', () => {
        expect(userServiceMock.generateCheckinToken).toHaveBeenCalledWith(user);
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
        userServiceMock.generateCheckinToken.mockResolvedValue(
          userData.refreshToken,
        );
        await checkinService.checkinUser(userCheckinDto);
      });

      it('should have called findUser', () => {
        const { uuid } = userData;
        expect(userServiceMock.findUser).toHaveBeenCalledWith({ uuid });
      });

      it('should have called generateCheckinToken', () => {
        expect(userServiceMock.generateCheckinToken).toHaveBeenCalledWith(user);
      });

      it('should have called refreshCheckinToken', () => {
        expect(userServiceMock.refreshCheckinToken).toHaveBeenCalledWith(user);
      });

      it('should have called checkinRepository.save', () => {
        expect(checkinRepositoryMock.save).toHaveBeenCalledWith({ user });
      });
    });
  });
});
