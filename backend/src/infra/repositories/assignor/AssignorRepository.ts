import { Injectable } from '@nestjs/common';

import { ReadAssignorDTO } from '../../../domain/dtos/assignor/ReadAssignorDTO';
import { AssignorEntity } from '../../../domain/entities/assignor/AssignorEntity';
import { AssignorRepositoryAbstract } from '../../../domain/repositories/AssignorRepositoryAbstract';
import { PrismaService } from '../../database/prisma.service';
import { AssignorMapper } from '../../mappers/assignor/AssignorMapper';

/**
 * Repository implementation for Assignor entities using Prisma.
 */
@Injectable()
export class AssignorRepository extends AssignorRepositoryAbstract {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AssignorMapper,
  ) {
    super();
  }

  /**
   * Creates a new assignor entity in the repository.
   *
   * @param {AssignorEntity} assignor - The assignor entity to create.
   * @returns {Promise<ReadAssignorDTO>} A promise that resolves to the created ReadAssignorDTO.
   */
  async create(assignor: AssignorEntity): Promise<ReadAssignorDTO> {
    const createdAssignor = await this.prisma.assignor.create({
      data: {
        id: assignor.id,
        name: assignor.name,
        email: assignor.email,
        document: assignor.document,
        phone: assignor.phone,
        login: assignor.login,
        password: assignor.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        login: true,
        password: false,
        document: true,
      },
    });

    return createdAssignor;
  }

  /**
   * Finds an assignor entity by its ID.
   *
   * @param {string} id - The ID of the assignor to find.
   * @returns {Promise<AssignorEntity | undefined>} A promise that resolves to the found AssignorEntity or undefined if not found.
   */
  async findById(id: string): Promise<AssignorEntity | undefined> {
    const assignor = await this.prisma.assignor.findUnique({ where: { id } });
    if (!assignor) {
      return undefined;
    }
    return this.mapper.toAssignorEntity(assignor);
  }
  /**
   * Finds an assignor entity by its Login.
   *
   * @param {string} login - The Login of the assignor to find.
   * @returns {Promise<AssignorEntity | undefined>} A promise that resolves to the found AssignorEntity or undefined if not found.
   */
  async findByLogin(login: string): Promise<AssignorEntity | undefined> {
    const assignor = await this.prisma.assignor.findUnique({ where: { login } });
    if (!assignor) {
      return undefined;
    }
    return this.mapper.toAssignorEntity(assignor);
  }

  /**
   * Updates an existing assignor entity in the repository.
   *
   * @param {string} id - The ID of the assignor to update.
   * @param {AssignorEntity} assignor - The assignor entity with updated data.
   * @returns {Promise<ReadAssignorDTO>} A promise that resolves to the updated ReadAssignorDTO.
   */
  async update(id: string, assignor: AssignorEntity): Promise<ReadAssignorDTO> {
    const updatedAssignor = await this.prisma.assignor.update({
      where: { id },
      data: {
        name: assignor.name,
        email: assignor.email,
        phone: assignor.phone,
        login: assignor.login,
        password: assignor.password,
        document: assignor.document,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        login: true,
        password: false,
        document: true,
      },
    });
    return updatedAssignor;
  }

  /**
   * Deletes an assignor entity by its ID.
   *
   * @param {string} id - The ID of the assignor to delete.
   * @returns {Promise<void>} A promise that resolves when the assignor entity is deleted.
   */
  async deleteById(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
