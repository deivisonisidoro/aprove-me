
import { UpdateAssignorDTO } from "../../../../domain/dtos/assignor/UpdateAssignorDTO";
import { Left } from "../../../../domain/either/Left";
import { Right } from "../../../../domain/either/Right";
import { AssignorEntity } from "../../../../domain/entities/assignor/AssignorEntity";
import { AssignorEntityFactory } from "../../../../domain/entities/assignor/AssignorEntityFactory";
import { ValidationMessages } from "../../../../domain/enums/assignor/ValidationMessageEnum";
import { AssignorRepositoryAbstract } from "../../../../domain/repositories/AssignorRepositoryAbstract";
import { UpdateAssignorUseCase } from "./UpdateAssignorUseCase";
import { ValidationError } from "../../../../domain/errors/ValidationErros";
import { UpdateAssignorUseCaseAbstract } from "../../../../domain/useCases/UpdateUseCaseAbstract";

describe("UpdateAssignorUseCase", () => {
  let updateAssignorUseCase: UpdateAssignorUseCaseAbstract;
  let assignorRepository: AssignorRepositoryAbstract;
  const assignorEntity = new AssignorEntity(
    '123e4567-e89b-12d3-a456-426614174000',
    '1234567890',
    'test@example.com',
    'John Doe',
    '1234567890',
    'validLogin',
    'Valid1@Password',
  );

  beforeEach(() => {
    assignorRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as AssignorRepositoryAbstract;
    updateAssignorUseCase = new UpdateAssignorUseCase(assignorRepository);
  });

  it("should return a validation error if the assignor is not found", async () => {
    const assignorId = "non-existent-id";
    (assignorRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await updateAssignorUseCase.execute(assignorId, {} as UpdateAssignorDTO);

    expect(result).toBeInstanceOf(Left);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ValidationError);
      expect(result.value.message).toBe(ValidationMessages.ASSIGNOR_NOT_FOUND);
    }
  });

  it("should update an assignor successfully", async () => {
    const assignorId = "existing-id";

    const updateAssignorDTO: UpdateAssignorDTO = {
      document: "new-document",
      email: "new-email@example.com",
      name: "new-name",
      phone: "new-phone",
      login: "new-login",
      password: "NewValid1@Password",
    };

    (assignorRepository.findById as jest.Mock).mockResolvedValue(assignorEntity);
    const updatedAssignorEntity = AssignorEntityFactory.updateAssignorEntity(
      assignorEntity,
      updateAssignorDTO.document,
      updateAssignorDTO.email,
      updateAssignorDTO.name,
      updateAssignorDTO.phone,
      updateAssignorDTO.login,
      updateAssignorDTO.password,
    );
    (assignorRepository.update as jest.Mock).mockResolvedValue(updatedAssignorEntity.value);

    const result = await updateAssignorUseCase.execute(assignorId, updateAssignorDTO);

    expect(result).toBeInstanceOf(Right);
    if (result.isRight()) {
      expect(result.value).toEqual(updatedAssignorEntity.value);
    }
  });

  it("should return a validation error if the updated assignor entity is invalid", async () => {
    const assignorId = "existing-id";
    const updateAssignorDTO: UpdateAssignorDTO = {
      document: "new-document",
      email: "invalid-email",
      name: "new-name",
      phone: "new-phone",
      login: "new-login",
      password: "new-password",
    };

    (assignorRepository.findById as jest.Mock).mockResolvedValue(assignorEntity);
    jest.spyOn(AssignorEntityFactory, "updateAssignorEntity").mockReturnValue(new Left(new ValidationError('Failed to update AssignorEntity')),);

    const result = await updateAssignorUseCase.execute(assignorId, updateAssignorDTO);

    expect(result).toBeInstanceOf(Left);
    if (result instanceof Left) {
      expect(result.value.message).toBe('Failed to update AssignorEntity');
    }
  });
});
