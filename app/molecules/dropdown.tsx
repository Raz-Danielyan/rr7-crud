import ArrowDownIcon from '@/assets/icons/arrow-down';
import useOutsideClick from '@/hooks/useOutsideClick';
import { dropdownConvertor, getLastPath } from '@/utils/dropdownConvertor';
import type { RouteConfigEntry } from '@react-router/dev/routes';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router';

export default function Dropdown({
  title,
  items,
  item,
  onSelect,
  ref,
}: {
  title: string;
  item: RouteConfigEntry;
  items: RouteConfigEntry[];
  onSelect?: (id: string) => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(ref?.current || null);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const handleChange = (item: RouteConfigEntry) => {
    onSelect && onSelect(item.id!);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className='relative inline-block text-left w-full'
        ref={(node) => {
          if (!dropdownRef.current && node) dropdownRef.current = node;
        }}
      >
        <div>
          <NavLink
            to={item.path!}
            className={({ isActive }) =>
              `text-${
                isActive ? 'indigo' : 'grey'
              }-600 hover:text-indigo-600 inline-flex w-full justify-between gap-x-1.5 transform duration-500 ease-in-out`
            }
            onMouseEnter={() => setIsOpen(true)}
          >
            {title}
            <ArrowDownIcon
              className={
                'transform duration-500 ease-in-out w-5' +
                (isOpen ? ' rotate-180' : '')
              }
            />
          </NavLink>
        </div>
        {isOpen && (
          <div
            className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex={-1}
          >
            <div className='py-1' role='none'>
              {items.map((route) => (
                <div className='block px-4 py-2 w-full' key={route.path}>
                  {route?.children?.length ? (
                    <Dropdown
                      title={getLastPath(route?.path)}
                      item={route}
                      items={dropdownConvertor(route)}
                      ref={dropdownRef}
                    />
                  ) : (
                    <NavLink
                      className={({ isActive }) =>
                        `text-${
                          isActive ? 'indigo' : 'grey'
                        }-600 hover:text-indigo-600 w-full h-full block`
                      }
                      key={route.path}
                      to={route.path!}
                      onClick={() => handleChange(route)}
                    >
                      {getLastPath(route?.path)}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
