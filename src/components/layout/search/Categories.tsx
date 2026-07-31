import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'

import { FilterList } from './filter'
import { CategoryItem } from './Categories.client'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  // 1. 获取所有分类（不限制数量）
  const categories = await payload.find({
    collection: 'categories',
    limit: 200, // ✅ 改为 100，获取全部
    sort: 'title',
  })

  // 2. 获取所有已发布的产品，统计每个分类的数量
  const products = await payload.find({
    collection: 'products',
    where: {
      _status: { equals: 'published' },
    },
    select: {
      categories: true,
    },
    limit: 1000,
  })

  // 3. 统计每个分类的产品数量
  const categoryCounts = new Map<number, number>()
  products.docs.forEach((product) => {
    if (product.categories && Array.isArray(product.categories)) {
      product.categories.forEach((cat: any) => {
        const catId = typeof cat === 'number' ? cat : cat.id
        categoryCounts.set(catId, (categoryCounts.get(catId) || 0) + 1)
      })
    }
  })

  // 4. 合并分类信息 + 数量，并按数量从多到少排序
  const sortedCategories = categories.docs
    .map((cat) => ({
      ...cat,
      count: categoryCounts.get(cat.id) || 0,
    }))
    .sort((a, b) => b.count - a.count)
  
  const DISPLAY_COUNT = 50
  const visibleCategories = sortedCategories.slice(0, DISPLAY_COUNT)

  return (
    <div>
      <h3 className="text-xs mb-2 text-neutral-500 dark:text-neutral-400">Category</h3>

      <ul>
        {visibleCategories.map((category) => {
          return (
            <li key={category.id} className="flex justify-between items-center">
              <CategoryItem category={category} />
              <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2">
                ({category.count})
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          {/* 骨架屏数量改为 25，覆盖你的 20+ 分类 */}
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          {Array.from({ length: 23 }).map((_, i) => (
            <div key={i} className={clsx(skeleton, items)} />
          ))}
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}