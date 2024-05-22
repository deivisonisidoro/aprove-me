export class CreateAssignorDTO {
  document: string;
  email: string;
  name: string;
  phone: string;
  login: string;
  password?: string;

  /**
   * Creates an instance of CreateAssignorDTO.
   *
   * @param {string} document - The document number of the assignor.
   * @param {string} email - The email address of the assignor.
   * @param {string} name - The name of the assignor.
   * @param {string} phone - The phone number of the assignor.
   * @param {string} login - The login of the assignor.
   * @param {string} password - The password of the assignor (optional).
   */
  constructor(
    document: string,
    email: string,
    name: string,
    phone: string,
    login: string,
    password?: string
  ) {
    this.document = document;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.login = login;
    this.password = password;
  }
}
