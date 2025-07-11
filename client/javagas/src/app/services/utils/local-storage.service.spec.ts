import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorage', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should set an item in local storage', () => {
      const key = 'testKey';
      const value = 'testValue';
      service.setItem(key, value);
      expect(localStorage.getItem(key)).toBe(value);
    });
  });
  describe('getItem', () => {
    it('should get an item from local storage', () => {
      const key = 'testKey';
      const value = 'testValue';
      localStorage.setItem(key, value);
      const result = service.getItem(key);
      expect(result).toBe(value);
    });
  });
});
