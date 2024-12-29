export interface ExpressValidatorError {
  location: string;
  msg: string;
  type: string;
  value: string;
  path: string;
}
