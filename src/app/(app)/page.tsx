// app/(app)/page.tsx
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { ArrowUpRight } from 'lucide-react'

const Homepage = async () => {
  const payload = await getPayload({ config: configPromise })

  const latestProducts = await payload.find({
    collection: 'products',
    limit: 8,
    sort: '-createdAt',
    where: { _status: { equals: 'published' } },
    depth: 2,
  })

  const products = latestProducts.docs

  const getProductImage = (product: any) => {
    if (product.gallery && product.gallery.length > 0 && product.gallery[0]?.image) {
      const image = product.gallery[0].image
      if (typeof image === 'object' && image.url) {
        return image.url
      }
    }
    if (product.meta?.image && typeof product.meta.image === 'object' && product.meta.image.url) {
      return product.meta.image.url
    }
    return '/images/placeholder.jpg'
  }

  // 行业数据
  const industries = [
    {
      id: '01',
      title: 'Oil & Gas',
      description: 'Upstream, midstream and downstream operations across the GCC.',
      image: '/images/oil and gas-CR5IiIfs.webp',
    },
    {
      id: '02',
      title: 'Petrochemical',
      description: 'Refining, processing and chemical handling infrastructure.',
      image: '/images/industry-petrochemical-Ba7VFJoA.webp',
    },
    {
      id: '03',
      title: 'Power Generation',
      description: 'Generation, transmission and distribution networks.',
      image: '/images/industry-power-D_bSQSQ6.webp',
    },
    {
      id: '04',
      title: 'Ship Building',
      description: 'Marine-grade systems for shipyards and offshore vessels.',
      image: '/images/industry-shipping-_JTxHZb-.webp',
    },
    {
      id: '05',
      title: 'Aviation',
      description: 'Engine, avionics and ground support equipment.',
      image: '/images/industry-aviation-C9tUG2mG.webp',
    },
  ]

  return (
    <>
      {/* Company Introduction - 两栏布局 */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Our company is a quality driven industrial automation and system integration company.
              Our core strength is our dedicated team of Professional Automation Experts and unique
              partnership models, with this we are positioned to deliver outcome-based solutions
              across the industry that meets and exceeds your business needs.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Promise!
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We are close to our customers, to ensure the quality and distinctive excellence of our
              solutions. We like to leave a mark. A guarantee for those who invest in our expertise
              and professionalism.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src="/images/Oil-Refining-Process.webp"
              alt="About us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Industries - 新增部分 */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform mb-10">
          <div className="text-[10px] uppercase tracking-editorial text-gold dark:text-amber-400">
            Our Industries
          </div>
        </div>
        <div className="grid gap-px bg-border-soft md:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform bg-white dark:bg-gray-900 group block"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  alt={industry.title}
                  width={1280}
                  height={960}
                  src={industry.image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-editorial text-gold dark:text-amber-400">
                    {industry.id}
                  </span>
                  <span className="mx-4 h-px flex-1 bg-border-soft dark:bg-gray-700"></span>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-colors group-hover:text-primary dark:text-gray-500 dark:group-hover:text-blue-400" />
                </div>
                <h3 className="font-display-light mb-3 text-3xl text-gray-900 dark:text-white">
                  {industry.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-foreground/65 dark:text-gray-400">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <section className="max-w-6xl mx-auto px-6 pb-12 pt-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={getProductImage(product)}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.priceInUSD && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      ${product.priceInUSD.toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Homepage