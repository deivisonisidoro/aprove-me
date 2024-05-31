import { AssignorEntity } from "../assignor/AssignorEntity";

/**
 * Interface representing the structure of a refresh token.
 *
 * @interface
 */
export interface IRefreshToken {
  expires_in: number;
  assignor_id: string;
  assignor: AssignorEntity;
  created_at: Date;
}

/**
 * Class representing a refresh token.
 *
 * @class
 */
export class RefreshToken {
  private _expires_in: number;
  private _assignor_id: string;
  private _assignor: AssignorEntity;
  private _created_at: Date;

  /**
   * Gets the expiration time of the refresh token.
   *
   * @readonly
   */
  get expires_in(): number {
    return this._expires_in;
  }

  /**
   * Gets the assignor ID associated with the refresh token.
   *
   * @readonly
   */
  get assignor_id(): string {
    return this._assignor_id;
  }

  /**
   * Gets the assignor associated with the refresh token.
   *
   * @readonly
   */
  get assignor(): AssignorEntity {
    return this._assignor;
  }

  /**
   * Gets the creation date of the refresh token.
   *
   * @readonly
   */
  get created_at(): Date {
    return this._created_at;
  }

  /**
   * Creates an instance of RefreshToken.
   *
   * @constructor
   * @param {IRefreshToken} props - The properties of the refresh token.
   */
  constructor(props: IRefreshToken) {
    this._expires_in = props.expires_in;
    this._assignor_id = props.assignor_id;
    this._created_at = props.created_at;
    this._assignor = props.assignor;
  }
}
