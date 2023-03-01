import { Category } from './category';
import { omit } from 'lodash';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe('Category Unit Tests', () => {
  test('constructor of category ', () => {
    let category = new Category({ name: 'Movie' });
    let props = omit(category.props, 'created_at');
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at
    });

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    });

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    });
  });

  test('id prop', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name: 'Movie' }, null);
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);


    category = new Category({ name: 'Movie' }, undefined);
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);


    category = new Category({ name: 'Movie' }, new UniqueEntityId());
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);
  });

  test('getter of name prop', () => {
    const category = new Category({ name: 'Movie' });

    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description prop', () => {
    let category = new Category({ name: 'Movie'});
    expect(category.description).toBe(null);

    category = new Category({ name: 'Movie', description: 'some description' });
    expect(category.description).toBe('some description');

    category = new Category({ name: 'Movie' });
    category['description'] = 'other description';
    expect(category.description).toBe('other description');

    category['description'] = undefined;
    expect(category.description).toBe(null);

    category['description'] = null;
    expect(category.description).toBe(null);
  });

  test('getter and setter of is_active prop', () => {
    let category = new Category({ name: 'Movie'});
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: false });
    expect(category.is_active).toBe(false);

    category = new Category({ name: 'Movie' });
    category['is_active'] = false;
    expect(category.is_active).toBe(false);

    category['is_active'] = undefined;
    expect(category.is_active).toBe(true);

    category['is_active'] = null;
    expect(category.is_active).toBe(true);
  });

  test('getter of created_at prop', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: 'Movie', created_at });
    expect(category.created_at).toBe(created_at);
  });
});
