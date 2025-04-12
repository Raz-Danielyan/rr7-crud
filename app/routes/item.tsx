import { supabase } from '@/supabase-client';
import { Form, redirect, type ActionFunctionArgs } from 'react-router';
import type { Route } from './+types/item';

export function meta() {
  return [
    { title: 'Edit Item | RR7 Crud' },
    {
      name: 'description',
      content:
        'Edit a item in the database using Supabase and React Router V7.',
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) {
    return { error: 'No item found' };
  }

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: error.message };
  }
  return { item: data };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const intent = formData.get('intent') as string;

  if (intent === 'delete') {
    const { error } = await supabase.from('items').delete().eq('id', params.id);

    if (error) {
      return { error: error.message };
    }
    return redirect('/');
  } else if (intent === 'update') {
    const { error } = await supabase
      .from('items')
      .update({ title, description })
      .eq('id', params.id);

    if (error) {
      return { error: error.message };
    }
    return { updated: true };
  }
  return {};
}

export default function Item({ loaderData, actionData }: Route.ComponentProps) {
  const { error, item } = loaderData;
  return (
    <div className='max-w-md mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Edit Item</h2>
      {actionData?.error && (
        <div className='bg-red-200 text-red-800 p-2 mb-4 rounded'>
          {actionData.error}
        </div>
      )}
      {actionData?.updated && (
        <div className='bg-green-200 text-green-800 p-2 mb-4 rounded'>
          Item updated successfully!
        </div>
      )}
      <Form method='post' className='space-y-4 bg-white p-4 rounded shadow'>
        <div>
          <label className='block text-gray-700'>Title</label>
          <input
            type='text'
            name='title'
            required
            defaultValue={item?.title}
            className='border border-gray-300 rounded px-3 py-2 w-full'
          />
        </div>
        <div>
          <label className='block text-grey-700'>Description</label>
          <textarea
            name='description'
            required
            defaultValue={item?.description}
            className='border border-gray-300 rounded px-3 py-2 w-full'
          />
        </div>
        <div className='flex space-x-4'>
          <button
            type='submit'
            name='intent'
            value='update'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500'
          >
            Updating Item
          </button>
          <button
            type='submit'
            name='intent'
            value='delete'
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500'
          >
            Delete Item
          </button>
        </div>
      </Form>
    </div>
  );
}
