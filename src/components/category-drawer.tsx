import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
// import { getAllCategories } from "@/lib/product.actions";
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const CategoryDrawer = async () => {
  // 假设 getAllCategories 返回字符串数组，如 ['PLC', 'HMI', 'SCADA']
  const categories = await getAllCategories();

  if (!categories || categories.length === 0) {
    return null; // 或者显示一个空状态的抽屉
  }

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='outline' size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle>Product Categories</DrawerTitle>
          <div className='space-y-1 mt-4'>
            {categories.map((category: string) => (
              <Button
                variant='ghost'
                className='w-full justify-start'
                key={category}
                asChild
              >
                <DrawerClose asChild>
                  <Link href={`/shop?category=${encodeURIComponent(category)}`}>
                    {category}
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;