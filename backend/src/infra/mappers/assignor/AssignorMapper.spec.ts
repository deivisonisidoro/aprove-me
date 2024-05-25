import { ReadAssignorDTO } from '../../../domain/dtos/assignor/ReadAssignorDTO';
import { AssignorEntity } from '../../../domain/entities/assignor/AssignorEntity';
import { AssignorMapper } from './AssignorMapper';

describe('AssignorMapper', () => {
  let assignorMapper: AssignorMapper;

  beforeEach(() => {
    assignorMapper = new AssignorMapper();
  });

  describe('toAssignorEntity', () => {
    it('should convert a ReadAssignorDTO to an AssignorEntity', () => {
      const readAssignorDTO: ReadAssignorDTO = {
        id: 'some-id',
        document: 'some-document',
        name: 'Test Name',
        email: 'test@example.com',
        phone: '1234567890',
        login: 'testlogin',
      };

      const expectedAssignorEntity = new AssignorEntity(
        'some-id',
        'some-document',
        'Test Name',
        'test@example.com',
        '1234567890',
        'testlogin',
      );

      const result = assignorMapper.toAssignorEntity(readAssignorDTO);

      expect(result).toEqual(expectedAssignorEntity);
    });
  });
});
