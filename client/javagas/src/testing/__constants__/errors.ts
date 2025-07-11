import { MessageResponse } from '../../app/types/http/response/MessageResponse';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

const login: MessageResponse = {
  message: 'Email or password is incorrect',
};

const emailAlreadyExists: MessageResponse = {
  message: 'Email already registered',
};

const usernameAlreadyExists: MessageResponse = {
  message: 'Username already registered',
};

const internal: MessageResponse = {
  message: 'An error occurred',
};

const invalidUserData = {
  email: 'Some error message',
  password: 'Some error message',
};

const invalidCandidateData = {
  ...invalidUserData,
  firstName: 'Some error message',
  lastName: 'Some error message',
};

const invalidCompanyData = {
  ...invalidUserData,
  name: 'Some error message',
  industry: 'Some error message',
};

const badRequest = {
  status: HttpStatusCode.BadRequest,
  statusText: HttpStatusCode[HttpStatusCode.BadRequest],
};

const conflict = {
  status: HttpStatusCode.Conflict,
  statusText: HttpStatusCode[HttpStatusCode.Conflict],
};

const unauthorized = {
  status: HttpStatusCode.Unauthorized,
  statusText: HttpStatusCode[HttpStatusCode.Unauthorized],
};

const internalServer = {
  status: HttpStatusCode.InternalServerError,
  statusText: HttpStatusCode[HttpStatusCode.InternalServerError],
};

export default {
  messages: {
    login,
    emailAlreadyExists,
    usernameAlreadyExists,
    invalidUserData,
    invalidCandidateData,
    invalidCompanyData,
  },
  options: {
    badRequest,
    conflict,
    unauthorized,
    internalServer,
  },
  internal: new HttpErrorResponse({
    ...internalServer,
    error: internal,
  }),
  login: new HttpErrorResponse({
    ...unauthorized,
    error: login,
  }),
  emailAlreadyExists: new HttpErrorResponse({
    ...conflict,
    error: emailAlreadyExists,
  }),
  usernameAlreadyExists: new HttpErrorResponse({
    ...conflict,
    error: usernameAlreadyExists,
  }),
  invalidCandidateData: new HttpErrorResponse({
    ...badRequest,
    error: invalidCandidateData,
  }),
  invalidCompanyData: new HttpErrorResponse({
    ...badRequest,
    error: invalidCandidateData,
  }),
  invalidUserData: new HttpErrorResponse({
    ...badRequest,
    error: invalidCandidateData,
  }),
};
