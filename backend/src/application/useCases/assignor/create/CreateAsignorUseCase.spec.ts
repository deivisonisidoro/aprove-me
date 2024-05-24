import { CreateAssignorDTO } from '../../../../domain/dtos/assignor/CreateAssignorDTO';
import { ReadAssignorDTO } from '../../../../domain/dtos/assignor/ReadAssignorDTO';
import { Left } from '../../../../domain/either/Left';
import { AssignorEntityFactory } from '../../../../domain/entities/assignor/AssignorEntityFactory';
import { AssignorValidationMessages } from '../../../../domain/enums/assignor/AssignorValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { CreateAssignorUseCaseAbstract } from '../../../../domain/useCases/assignor/CreateAssignorUseCaseAbstract ';
import { CreateAssignorUseCase } from './CreateAsignorUseCase';

describe('CreateAssignorUseCase', () => {
  let assignorRepositoryMock: AssignorRepositoryAbstract;
  let createAssignorUseCase: CreateAssignorUseCaseAbstract;

  const createAssignorDTO: CreateAssignorDTO = {
    document: '123456789012345678901234567890',
    email: 'test@example.com',
    name: 'Test User',
    phone: '1234567890',
    login: 'testuser',
    password: 'P@ssw0rd',
  };
  const readAssignorDTO: ReadAssignorDTO = {
    document: '123456789012345678901234567890',
    email: 'test@example.com',
    name: 'Test User',
    phone: '1234567890',
    login: 'testuser',
  };
  beforeEach(() => {
    assignorRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as AssignorRepositoryAbstract;

    createAssignorUseCase = new CreateAssignorUseCase(assignorRepositoryMock);
  });

  it('should return Left with ValidationError when document is missing', async () => {
    const result = await createAssignorUseCase.execute({
      ...createAssignorDTO,
      document: '',
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe(
        AssignorValidationMessages.DOCUMENT_REQUIRED,
      );
    }
  });

  it('should return Left with ValidationError when email is missing', async () => {
    const result = await createAssignorUseCase.execute({
      ...createAssignorDTO,
      email: '',
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe(
        AssignorValidationMessages.EMAIL_REQUIRED,
      );
    }
  });

  it('should return Left with ValidationError when AssignorEntity creation fails', async () => {
    jest
      .spyOn(AssignorEntityFactory, 'createAssignorEntity')
      .mockReturnValueOnce(
        new Left(new ValidationError('Failed to create AssignorEntity')),
      );

    const result = await createAssignorUseCase.execute(createAssignorDTO);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe('Failed to create AssignorEntity');
    }
  });

  it('should return Right with ReadAssignorDTO when inputs are valid', async () => {
    (assignorRepositoryMock.create as jest.Mock).mockResolvedValue(
      readAssignorDTO,
    );
    const assignorEntity = AssignorEntityFactory.createAssignorEntity(
      undefined,
      createAssignorDTO.document,
      createAssignorDTO.email,
      createAssignorDTO.name,
      createAssignorDTO.phone,
      createAssignorDTO.login,
      createAssignorDTO.password,
    );
    const result = await createAssignorUseCase.execute(createAssignorDTO);
    expect(result.isRight()).toBe(true);
    expect(assignorRepositoryMock.create).toHaveBeenCalledWith(
      assignorEntity.value,
    );
  });
});
