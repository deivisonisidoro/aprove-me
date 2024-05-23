export class ReadAssignorDTO {
  id?: string;
  document: string;
  email: string;
  name: string;
  phone: string;
  login: string;

  /**
   * Creates an instance of ReadAssignorDTO.
   *
   * @param {string | undefined} id - The unique identifier for the assignor.
   * @param {string} document - The document number of the assignor.
   * @param {string} email - The email address of the assignor.
   * @param {string} name - The name of the assignor.
   * @param {string} phone - The phone number of the assignor.
   * @param {string} login - The login of the assignor.
   */
  constructor(
    id: string | undefined,
    document: string,
    email: string,
    name: string,
    phone: string,
    login: string
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.login = login;
  }
}
