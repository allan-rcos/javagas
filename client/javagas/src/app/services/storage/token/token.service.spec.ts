import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { LocalStorageService } from '../../utils/local-storage.service';
import responses from '../../../../testing/__constants__/responses';

describe('TokenService', () => {
  let service: TokenService;
  let localStorageMock: {
    getItem: jest.Mock;
    setItem: jest.Mock;
  };

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn().mockReturnValue(null),
      setItem: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageMock },
        TokenService,
      ],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStored', () => {
    it('should return null when localStorage is null', () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(service.stored).toBeNull();
      //@ts-ignore
      expect(localStorageMock.getItem).toHaveBeenCalledWith(service.storageKey);
    });
    it('should return the stored token', () => {
      localStorageMock.getItem.mockReturnValue(responses.token.token);
      expect(service.stored).toBe(responses.token.token);
      //@ts-ignore
      expect(localStorageMock.getItem).toHaveBeenCalledWith(service.storageKey);
    });
  });

  describe('setStored', () => {
    it('should call local storage set item with token', () => {
      service.stored = responses.token.token;
      expect(localStorageMock.setItem)
        // @ts-ignore
        .toHaveBeenCalledWith(service.storageKey, responses.token.token);
    });
    it('should call local storage set item with null', () => {
      service.stored = null;
      expect(localStorageMock.setItem)
        // @ts-ignore
        .toHaveBeenCalledWith(service.storageKey, null);
    });
  });
});
