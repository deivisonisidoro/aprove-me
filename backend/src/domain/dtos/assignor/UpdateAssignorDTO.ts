export class UpdateAssignorDTO {
  id?: string;
  document?: string;
  email?: string;
  name?: string;
  phone?: string;
  login?: string;
  password?: string;

  /**
   * Creates an instance of UpdateAssignorDTO.
   *
   * @param {string} id - The unique identifier for the assignor (optional).
   * @param {string} document - The document number of the assignor (optional).
   * @param {string} email - The email address of the assignor (optional).
   * @param {string} name - The name of the assignor (optional).
   * @param {string} phone - The phone number of the assignor (optional).
   * @param {string} login - The login of the assignor (optional).
   * @param {string} password - The password of the assignor (optional).
   */
  constructor(
    id?: string,
    document?: string,
    email?: string,
    name?: string,
    phone?: string,
    login?: string,
    password?: string,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.login = login;
    this.password = password;
  }
}
