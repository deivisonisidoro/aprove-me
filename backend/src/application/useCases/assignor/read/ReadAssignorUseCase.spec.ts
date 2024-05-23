import { ReadAssignorUseCaseAbstract } from "../../../../domain/useCases/read/ReadAssignorUseCaseAbstract";
import { ReadAssignorDTO } from "../../../../domain/dtos/assignor/ReadAssignorDTO";
import { ValidationError } from "../../../../domain/errors/ValidationErros";
import { AssignorRepositoryAbstract } from "../../../../domain/repositories/AssignorRepositoryAbstract";
import { ReadAssignorUseCase } from "./ReadAssignorUseCase";


describe("ReadAssignorUseCase", () => {
  let assignorRepositoryMock: AssignorRepositoryAbstract;
  let readAssignorUseCase: ReadAssignorUseCaseAbstract;
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


    readAssignorUseCase = new ReadAssignorUseCase(
      assignorRepositoryMock,

    );
  });
  it("should return a Right with the read assignor DTO if assignor is found", async () => {
    const assignorId = "validId";
    (assignorRepositoryMock.findById as jest.Mock).mockResolvedValue(readAssignorDTO);
    const result = await readAssignorUseCase.execute(assignorId);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(readAssignorDTO);
  });

  it("should return a Left with a validation error if assignor is not found", async () => {
    const assignorId = "invalidId";

    const result = await readAssignorUseCase.execute(assignorId);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if(result.isLeft()){
      expect(result.value.message).toBe("Assignor not found.");
    }
  });
});
