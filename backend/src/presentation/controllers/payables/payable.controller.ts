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

import { CreatePayableDTO } from '../../../domain/dtos/payable/CreatePayableDTO';
import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { UpdatePayableDTO } from '../../../domain/dtos/payable/UpdatePayableDTO';
import { CreatePayableUseCaseAbstract } from '../../../domain/useCases/payable/CreatePayableUseCase';
import { DeletePayableUseCaseAbstract } from '../../../domain/useCases/payable/DeletePayableUseCase';
import { ReadPayableByIdUseCaseAbstract } from '../../../domain/useCases/payable/ReadPayableByIdUseCase';
import { UpdatePayableUseCaseAbstract } from '../../../domain/useCases/payable/UpdatePayableUseCase';

@Controller('payables')
export class PayableController {
  constructor(
    private readonly createPayableUseCase: CreatePayableUseCaseAbstract,
    private readonly readPayableByIdUseCase: ReadPayableByIdUseCaseAbstract,
    private readonly updatePayableUseCase: UpdatePayableUseCaseAbstract,
    private readonly deletePayableUseCase: DeletePayableUseCaseAbstract,
  ) {}

  /**
   * Creates a new payable.
   * @param createPayableDto - The DTO containing payable creation data.
   * @returns The created payable.
   * @throws {BadRequestException} If the creation fails due to validation errors.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Post()
  @HttpCode(201)
  async create(
    @Body() createPayableDto: CreatePayableDTO,
  ): Promise<ReadPayableDTO> {
    const missingFields: string[] = [];
    if (!createPayableDto.value) missingFields.push('Value');
    if (!createPayableDto.emissionDate) missingFields.push('Emission Date');
    if (!createPayableDto.assignorId) missingFields.push('Assignor ID');
    if (missingFields.length > 0) {
      const errorMessage = `The following fields are required: ${missingFields.join(', ')}.`;
      throw new UnprocessableEntityException(errorMessage);
    }

    const dto = new CreatePayableDTO(
      createPayableDto.value,
      createPayableDto.emissionDate,
      createPayableDto.assignorId,
    );
    const result = await this.createPayableUseCase.execute(dto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Finds a payable by ID.
   * @param id - The ID of the payable to find.
   * @returns The found payable.
   * @throws {NotFoundException} If the payable is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReadPayableDTO> {
    const result = await this.readPayableByIdUseCase.execute(id);
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }

  /**
   * Updates an existing payable.
   * @param id - The ID of the payable to update.
   * @param updatePayableDto - The DTO containing payable update data.
   * @returns The updated payable.
   * @throws {BadRequestException} If the update fails due to validation errors.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDTO,
  ): Promise<ReadPayableDTO> {
    if (
      !updatePayableDto.value &&
      !updatePayableDto.emissionDate &&
      !updatePayableDto.assignorId
    )
      throw new UnprocessableEntityException(
        'At least one field must be provided for update.',
      );

    const dto = new UpdatePayableDTO(
      id,
      updatePayableDto.value,
      updatePayableDto.emissionDate,
      updatePayableDto.assignorId,
    );
    const result = await this.updatePayableUseCase.execute(id, dto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Deletes a payable by ID.
   * @param id - The ID of the payable to delete.
   * @throws {NotFoundException} If the payable is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id') id: string): Promise<string> {
    const result = await this.deletePayableUseCase.execute(id);

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }
}
