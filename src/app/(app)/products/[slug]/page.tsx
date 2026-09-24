// src/app/(app)/products/[slug]/page.tsx
import type { Media, Product } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { GridTileImage } from '@/components/Grid/tile'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Metadata } from 'next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// ✅ 新增：ISR，每小时后台重新验证
export const revalidate = 3600

//  预生成最多 10,000 个已发布产品页面
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 10000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      _status: { equals: 'published' },
    },
  })

  return products.docs.map((product) => ({
    slug: product.slug,
  }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  // ✅ 改动：metadata 里默认不走 draft
  const product = await queryProductBySlug({ slug, draft: false })

  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const canIndex = product._status === 'published'

  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  }
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params

  // ✅ 改动：draftMode 只在页面层调用，不传进查询函数以外的地方
  const { isEnabled: draft } = await draftMode()

  // ✅ 改动：把 draft 作为参数传进去
  const product = await queryProductBySlug({ slug, draft })

  if (!product) return notFound()

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({
        ...item,
        image: item.image as Media,
      })) || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== 'object') return false
        return variant.inventory && variant?.inventory > 0
      })
    : product.inventory! > 0

  let price = product.priceInUSD

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (typeof variant === 'object' && variant?.priceInUSD && acc && variant?.priceInUSD > acc) {
        return variant.priceInUSD
      }
      return acc
    }, price)
  }

  const categoryName = product.categories?.[0]
    ? typeof product.categories[0] === 'object'
      ? product.categories[0].title
      : product.categories[0]
    : null

  const categoryId = product.categories?.[0]
    ? typeof product.categories[0] === 'object'
      ? product.categories[0].id
      : null
    : null

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description:
    typeof product.description === 'string'
      ? product.description
      : product.meta?.description || '',
    image: metaImage?.url,
    sku: product.slug,
    brand: categoryName
    ? {
        '@type': 'Brand',
        name: categoryName,
      }
    : undefined,
    offers: {
      '@type': 'Offer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: typeof price === 'number' ? price / 100 : price,
      priceCurrency: 'usd',
      url: `https://panasonicservomotor.com/products/${product.slug}`,
    },
  }

  const relatedProducts =
    product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <div className="container pt-8 pb-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">All products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {categoryName && categoryId ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/shop?category=${categoryId}`}>
                    {categoryName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : null}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button asChild variant="ghost" className="mb-4">
          <Link href="/shop">
            <ChevronLeftIcon />
            All products
          </Link>
        </Button>

        <div className="flex flex-col gap-12 rounded-lg border p-8 md:py-12 lg:flex-row lg:gap-8 bg-primary-foreground">
          <div className="h-full w-full basis-full lg:basis-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </div>

          <div className="basis-full lg:basis-1/2">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : <></>}

      {relatedProducts.length ? (
        <div className="container">
          <RelatedProducts products={relatedProducts as Product[]} />
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  )
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {products.map((product) => (
          <li
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            key={product.id}
          >
            <Link className="relative h-full w-full" href={`/products/${product.slug}`}>
              <GridTileImage
                label={{
                  amount: product.priceInUSD!,
                  title: product.title,
                }}
                media={product.meta?.image as Media}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ✅ 改动：draft 变成参数，不再在函数内部调用 draftMode()
const queryProductBySlug = async ({
  slug,
  draft = false,
}: {
  slug: string
  draft?: boolean
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUSD: true,
        inventory: true,
        options: true,
      },
    },
  })

  return result.docs?.[0] || null
}