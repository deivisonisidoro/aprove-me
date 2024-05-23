import { CreateAssignorDTO } from "../../../../domain/dtos/assignor/CreateAssignorDTO";
import { ValidationMessages } from "../../../../domain/enums/assignor/ValidationMessageEnum";
import { AssignorRepositoryAbstract } from "../../../../domain/repositories/AssignorRepositoryAbstract";
import { ValidationError } from "../../../../domain/errors/ValidationErros";
import { ReadAssignorDTO } from "../../../../domain/dtos/assignor/ReadAssignorDTO";
import { CreateAssignorUseCase } from "./CreateAsignorUseCase";
import { CreateAssignorUseCaseAbstract } from "../../../../domain/useCases/create/CreateAssignorUseCaseAbstract ";
import { AssignorEntityFactory } from "../../../../domain/entities/assignor/AssignorEntityFactory";
import { Left } from "../../../../domain/either/Left";

describe('CreateAssignorUseCase', () => {
  let assignorRepositoryMock: AssignorRepositoryAbstract;
  let createAssignorUseCase: CreateAssignorUseCaseAbstract;

  const createAssignorDTO: CreateAssignorDTO = {
    document: '123456789012345678901234567890',
    email: 'test@example.com',
    name: 'Test User',
    phone: '1234567890',
    login: 'testuser',
    password: 'P@ssw0rd'
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


    createAssignorUseCase = new CreateAssignorUseCase(
      assignorRepositoryMock,

    );
  });

  it('should return Left with ValidationError when document is missing', async () => {
    const result = await createAssignorUseCase.execute({ ...createAssignorDTO, document: '' });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if(result.isLeft()){
      expect(result.value.message).toBe(ValidationMessages.DOCUMENT_REQUIRED);
    }
  });

  it('should return Left with ValidationError when email is missing', async () => {
    const result = await createAssignorUseCase.execute({ ...createAssignorDTO, email: '' });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if(result.isLeft()){
      expect(result.value.message).toBe(ValidationMessages.EMAIL_REQUIRED);
    }
  });

  it('should return Left with ValidationError when AssignorEntity creation fails', async () => {
    jest.spyOn(AssignorEntityFactory, 'createAssignorEntity').mockReturnValueOnce(new Left(new ValidationError('Failed to create AssignorEntity')));

    const result = await createAssignorUseCase.execute(createAssignorDTO);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if(result.isLeft()){
      expect(result.value.message).toBe('Failed to create AssignorEntity');
    }
  });

  it('should return Right with ReadAssignorDTO when inputs are valid', async () => {
    (assignorRepositoryMock.create as jest.Mock).mockResolvedValue(readAssignorDTO);
    const assignorEntity = AssignorEntityFactory.createAssignorEntity(
      undefined,
      createAssignorDTO.document,
      createAssignorDTO.email,
      createAssignorDTO.name,
      createAssignorDTO.phone,
      createAssignorDTO.login,
      createAssignorDTO.password,
    )
    const result = await createAssignorUseCase.execute(createAssignorDTO);
    expect(result.isRight()).toBe(true);
    expect(assignorRepositoryMock.create).toHaveBeenCalledWith(assignorEntity.value);
  });
});
