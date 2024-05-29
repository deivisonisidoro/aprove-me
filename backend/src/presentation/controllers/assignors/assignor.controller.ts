import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateAssignorDTO } from '../../../domain/dtos/assignor/CreateAssignorDTO';
import { ReadAssignorDTO } from '../../../domain/dtos/assignor/ReadAssignorDTO';
import { UpdateAssignorDTO } from '../../../domain/dtos/assignor/UpdateAssignorDTO';
import { CreateAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/CreateAssignorUseCaseAbstract ';
import { DeleteAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/DeleteAssignorUseCaseAbstract';
import { ReadAssignorByIdUseCaseAbstract } from '../../../domain/useCases/assignor/ReadAssignorByIdUseCaseAbstract';
import { UpdateAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/UpdateUseCaseAbstract';

@Controller('assignor')
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: CreateAssignorUseCaseAbstract,
    private readonly readAssignorByIdUseCase: ReadAssignorByIdUseCaseAbstract,
    private readonly updateAssignorUseCase: UpdateAssignorUseCaseAbstract,
    private readonly deleteAssignorUseCase: DeleteAssignorUseCaseAbstract,
  ) {}

  /**
   * Creates a new assignor.
   * @param createAssignorDto - The DTO containing assignor creation data.
   * @returns The created assignor.
   * @throws {BadRequestException} If the creation fails due to validation errors.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Post()
  @HttpCode(201)
  async create(
    @Body() createAssignorDto: CreateAssignorDTO,
  ): Promise<ReadAssignorDTO> {
    const missingFields: string[] = [];
    if (!createAssignorDto.document) missingFields.push('Document');
    if (!createAssignorDto.email) missingFields.push('Email');
    if (!createAssignorDto.name) missingFields.push('Name');
    if (!createAssignorDto.phone) missingFields.push('Phone');
    if (!createAssignorDto.login) missingFields.push('Login');
    if (missingFields.length > 0) {
      const errorMessage = `The following fields are required: ${missingFields.join(', ')}.`;
      throw new UnprocessableEntityException(errorMessage);
    }

    const dto = new CreateAssignorDTO(
      createAssignorDto.document,
      createAssignorDto.email,
      createAssignorDto.name,
      createAssignorDto.phone,
      createAssignorDto.login,
      createAssignorDto.password,
    );

    const result = await this.createAssignorUseCase.execute(dto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Finds an assignor by ID.
   * @param id - The ID of the assignor to find.
   * @returns The found assignor.
   * @throws {NotFoundException} If the assignor is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReadAssignorDTO> {
    const result = await this.readAssignorByIdUseCase.execute(id);
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }

  /**
   * Updates an existing assignor.
   * @param id - The ID of the assignor to update.
   * @param updateAssignorDto - The DTO containing assignor update data.
   * @returns The updated assignor.
   * @throws {BadRequestException} If the update fails due to validation errors.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDTO,
  ): Promise<ReadAssignorDTO> {
    if (
      !updateAssignorDto.document &&
      !updateAssignorDto.email &&
      !updateAssignorDto.name &&
      !updateAssignorDto.phone &&
      !updateAssignorDto.login &&
      !updateAssignorDto.password
    )
      throw new UnprocessableEntityException(
        'At least one field must be provided for update.',
      );

    const dto = new UpdateAssignorDTO(
      id,
      updateAssignorDto.document,
      updateAssignorDto.email,
      updateAssignorDto.name,
      updateAssignorDto.phone,
      updateAssignorDto.login,
      updateAssignorDto.password,
    );
    const result = await this.updateAssignorUseCase.execute(id, dto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Deletes an assignor by ID.
   * @param id - The ID of the assignor to delete.
   * @throws {NotFoundException} If the assignor is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id') id: string): Promise<void> {
    const result = await this.deleteAssignorUseCase.execute(id);
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
  }
}
