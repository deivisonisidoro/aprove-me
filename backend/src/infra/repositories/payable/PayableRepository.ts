import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { PayableEntity } from '../../../domain/entities/payable/PayableEntity';
import { PayableRepositoryAbstract } from '../../../domain/repositories/PayableRepositoryAbstract';
import { PrismaService } from '../../database/prisma.service';
import { PayableMapper } from '../../mappers/payable/PayableMapper';

export class PayableRepository extends PayableRepositoryAbstract {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: PayableMapper,
  ) {
    super();
  }

  /**
   * Saves a payable entity to the repository.
   *
   * @param {PayableEntity} payable - The payable entity to save.
   * @returns {Promise<ReadPayableDTO>} A promise that resolves to the saved PayableEntity.
   */
  async create(payable: PayableEntity): Promise<ReadPayableDTO> {
    const createdPayable = await this.prisma.payable.create({
      data: payable,
    });
    return createdPayable as ReadPayableDTO;
  }

  /**
   * Finds a payable entity by its ID.
   *
   * @param {string} id - The ID of the payable to find.
   * @returns {Promise<PayableEntity | undefined>} A promise that resolves to the found PayableEntity or undefined.
   */
  async findById(id: string): Promise<PayableEntity | undefined> {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });
    return this.mapper.toEntity(payable) || undefined;
  }

  /**
   * Updates a Payable entity in the repository.
   *
   * @param {string} id - The ID of the Payable to update.
   * @param {PayableEntity} payable - The Payable entity to update.
   * @returns {Promise<ReadPayableDTO>} A promise that resolves to the updated PayableEntity.
   */
  async update(id: string, payable: PayableEntity): Promise<ReadPayableDTO> {
    const updatedPayable = await this.prisma.payable.update({
      where: { id },
      data: payable,
    });
    return updatedPayable as ReadPayableDTO;
  }

  /**
   * Deletes a Payable entity by its ID.
   *
   * @param {string} id - The ID of the Payable to delete.
   * @returns {Promise<void>} A promise that resolves to void if successful.
   */
  async deleteById(id: string): Promise<void> {
    await this.prisma.payable.delete({
      where: { id },
    });
  }
}
