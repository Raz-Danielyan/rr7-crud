import type { RouteConfigEntry } from '@react-router/dev/routes';

export const dropdownConvertor = (data: RouteConfigEntry) => {
  return (
    data.children
      ?.filter((el) => el.path)
      .map((el) => ({ ...el, path: data.path + '/' + el.path })) || []
  );
};

export const getLastPath = (data: string | undefined) =>
  data
    ?.replace(/\/:\w+/g, '')
    ?.split('/')
    .pop() || '';
