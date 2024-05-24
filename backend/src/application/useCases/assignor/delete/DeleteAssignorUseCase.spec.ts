import { DeleteAssignorUseCase } from './DeleteAssignorUseCase';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { AssignorValidationMessages } from '../../../../domain/enums/assignor/AssignorValidationMessageEnum';
import { AssignorSuccessMessage } from '../../../../domain/enums/assignor/AssingorSuccessMessages';
import { AssignorEntity } from '../../../../domain/entities/assignor/AssignorEntity';

describe('DeleteAssignorUseCase', () => {
  let deleteAssignorUseCase: DeleteAssignorUseCase;
  let assignorRepository: jest.Mocked<AssignorRepositoryAbstract>;

  beforeEach(() => {
    assignorRepository = {
      findById: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as jest.Mocked<AssignorRepositoryAbstract>;

    deleteAssignorUseCase = new DeleteAssignorUseCase(assignorRepository);
  });

  it('should return success message when assignor is successfully deleted', async () => {
    const assignorId = 'valid-id';
    const assignorEntity = new AssignorEntity(
      '123e4567-e89b-12d3-a456-426614174000',
      '1234567890',
      'test@example.com',
      'John Doe',
      '1234567890',
      'validLogin',
      'Valid1@Password',
    );
    assignorRepository.findById.mockResolvedValue(assignorEntity);
    assignorRepository.deleteById.mockResolvedValue();

    const result = await deleteAssignorUseCase.execute(assignorId);

    expect(result).toEqual(new Right(AssignorSuccessMessage.DELETED_SUCCESSFULLY));
    expect(assignorRepository.findById).toHaveBeenCalledWith(assignorId);
    expect(assignorRepository.deleteById).toHaveBeenCalledWith(assignorId);
  });

  it('should return validation error when assignor is not found', async () => {
    const assignorId = 'invalid-id';
    assignorRepository.findById.mockResolvedValue(null);

    const result = await deleteAssignorUseCase.execute(assignorId);

    expect(result).toEqual(new Left(new ValidationError(AssignorValidationMessages.ASSIGNOR_NOT_FOUND)));
    expect(assignorRepository.findById).toHaveBeenCalledWith(assignorId);
    expect(assignorRepository.deleteById).not.toHaveBeenCalled();
  });
});
