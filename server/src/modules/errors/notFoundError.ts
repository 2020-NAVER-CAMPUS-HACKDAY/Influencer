import status from '../util/statusCode';
import errorName from '../util/errorName';

export default class NotFoundError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = errorName.NOT_FOUND;
    this.status = status.NOT_FOUND;
  }
}
