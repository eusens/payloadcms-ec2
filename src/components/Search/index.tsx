// src/components/Search/index.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

type Props = {
  className?: string;
};

const Search = async ({ className }: Props) => {
  const payload = await getPayload({ config: configPromise });
  
  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
    limit: 100,
  });

  return (
    <form action='/shop' method='GET' className={className}>
      <div className='flex w-full max-w-2xl items-center gap-2 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
        <Select name='category'>
          {/* ✅ 添加 h-9 统一高度 */}
          <SelectTrigger className='w-[160px] h-9 border-0 bg-transparent focus:ring-0 focus:ring-offset-0'>
            <SelectValue placeholder='All Categories' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            {categories.docs.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className='w-px h-6 bg-gray-200 dark:bg-gray-700' />
        
        {/* ✅ 添加 h-9 统一高度 */}
        <Input
          name='q'
          type='text'
          placeholder='Search products...'
          className='flex-1 h-9 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 dark:placeholder:text-gray-500'
        />
        
        {/* ✅ 添加 h-9 统一高度 */}
        <Button type='submit' size='sm' className='shrink-0 h-9'>
          <SearchIcon className='h-4 w-4' />
          <span className='sr-only'>Search</span>
        </Button>
      </div>
    </form>
  );
};

export default Search;