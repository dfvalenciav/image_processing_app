'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const index_1 = __importDefault(require('../index')); // Assuming your app.ts is in the root folder
describe('Test to verify endpoint and resize image', () => {
  it('GET /api/images should return a resized image', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=palmtunnel&width=100&height=100')
        .expect(200);
      // Add more assertions as needed
      expect(response.headers['content-type']).toEqual('image/jpeg');
      expect(response.body).toBeDefined();
    }));
});
describe('Test to manage error handling', () => {
  it('should handle error when resizing image fails', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Make a request with invalid parameters to trigger an error in sharpModule
      yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=nonexistent&width=100&height=100')
        .expect(500, 'Internal Server Error');
    }));
});
describe('Image Cache Tests', () => {
  it('should return the same cached image for identical resizing parameters', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Make two requests with the same resizing parameters
      const response1 = yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=palmtunnel&width=200&height=300')
        .expect(200);
      const response2 = yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=palmtunnel&width=200&height=300')
        .expect(200);
      // Expect that the content of both responses is the same (indicating the same cached image)
      expect(response1.body).toEqual(response2.body);
    }));
  it('should return different images for different resizing parameters', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Make two requests with different resizing parameters
      const response1 = yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=palmtunnel&width=200&height=300')
        .expect(200);
      const response2 = yield (0, supertest_1.default)(index_1.default)
        .get('/api/images?filename=palmtunnel&width=400&height=600')
        .expect(200);
      // Expect that the content of both responses is different (indicating different images)
      expect(response1.body).not.toEqual(response2.body);
    }));
});
