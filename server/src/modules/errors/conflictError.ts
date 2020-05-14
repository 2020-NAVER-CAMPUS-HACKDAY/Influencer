import status from '../util/statusCode';
import errorName from '../util/errorName';

export default class ConflictError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = errorName.CONFLICT;
    this.status = status.CONFLICT;
  }
}
