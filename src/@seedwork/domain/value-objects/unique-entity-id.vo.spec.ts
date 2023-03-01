import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { UniqueEntityId } from "./unique-entity-id.vo";
import { validate as uuidValidate } from 'uuid';

const spyValidateMethod = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = spyValidateMethod();
    const uuid = 'e07cf3d3-1c9d-427a-88aa-cebd85f9294f';
    const vo = new UniqueEntityId(uuid);
  
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should generate a uuid', () => {
    const validateSpy = spyValidateMethod();
    const vo = new UniqueEntityId();
  
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});