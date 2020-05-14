import status from '../util/statusCode';
import errorName from '../util/errorName';

export default class UnauthorizedError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = errorName.UNAUTHORIZED;
    this.status = status.UNAUTHORIZED;
  }
}
