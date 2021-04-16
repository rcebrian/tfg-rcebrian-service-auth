/**
 * @extends Error
 */
export default class ExtendableError extends Error {
  errors: any;

  status: any;

  isPublic: any;

  isOperational: any;

  constructor({
    message, errors, status, isPublic, stack,
  }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}
