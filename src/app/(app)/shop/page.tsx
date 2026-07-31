// src/app/(app)/shop/page.tsx
import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { PaginationComponent } from '@/components/PaginationComponent'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Props = {
  searchParams: Promise<SearchParams>
}

const getStringParam = (param: string | string[] | undefined): string | undefined => {
  if (typeof param === 'string') return param
  if (Array.isArray(param) && param.length > 0) return param[0]
  return undefined
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams

  const searchValue = getStringParam(params.q)
  const sort = getStringParam(params.sort)
  const category = getStringParam(params.category)
  const pageParam = getStringParam(params.page) || '1'

  const currentPage = Math.max(1, parseInt(pageParam, 10) || 1)
  const ITEMS_PER_PAGE = 12

  const payload = await getPayload({ config: configPromise })

  const whereConditions: any[] = [{ _status: { equals: 'published' } }]
  if (searchValue) {
    whereConditions.push({
      or: [
        { title: { like: searchValue } },
        // { description: { like: searchValue } },
      ],
    })
  }
  if (category && category !== 'all') {
    whereConditions.push({ categories: { contains: category } })
  }

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    limit: ITEMS_PER_PAGE,
    page: currentPage,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    sort: sort || 'title',
    where: whereConditions.length === 1
      ? whereConditions[0]
      : { and: whereConditions },
  })

  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  return (
    <div>
      {searchValue && (
        <p className="mb-4">
          {products.docs?.length === 0
            ? 'There are no products that match '
            : `Showing ${products.totalDocs} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      )}

      {!searchValue && products.docs?.length === 0 && (
        <p className="mb-4">No products found. Please try different filters.</p>
      )}

      {products.docs.length > 0 && (
        <>
          <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.docs.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>

          {/* ✅ 只传两个数字参数，不传函数 */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={products.totalPages}
          />
        </>
      )}
    </div>
  )
}