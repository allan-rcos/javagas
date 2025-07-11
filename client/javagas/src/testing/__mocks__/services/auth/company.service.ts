import { IRegisterHttpService } from '../../../../app/types/services/interfaces/http/register-http.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import messages from '../../../__constants__/messages';

export class MockedCompanyService implements IRegisterHttpService {
  URL!: string;
  http!: HttpClient;

  register() {
    return of(messages.companyRegisterSuccess);
  }
}
