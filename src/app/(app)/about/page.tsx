import Image from "next/image";
const industries = [
  {
    src: "/images/marine-industry.webp",
    alt: "marine industry",
    title: "marine industry",
  },
  {
    src: "/images/mining-industry.webp",
    alt: "Mining Industry",
    title: "Mining Industry",
  },
  {
    src: "/images/oil-and-gas.webp",
    alt: "oil and gas",
    title: "oil and gas",
  },
  {
    src: "/images/Oil-Refining-Process.webp",
    alt: "Oil Refining Process",
    title: "Oil Refining Process",
  },
  {
    src: "/images/Oil-Transportation.webp",
    alt: "Oil Transportation",
    title: "Oil Transportation",
  },
  {
    src: "/images/Water-Treatment-Desalination-Plant.webp",
    alt: "Water Treatment & Desalination Plant",
    title: "Water Treatment & Desalination Plant",
  },
];


export default function AboutPage() {
  return (
    <>
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        Industries We Serve
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {industries.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-56">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4 text-center">
              <span className="block text-lg font-medium text-gray-800">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>,
    <div className="p-4 text-center">
    {/* <span className="block text-lg font-medium text-gray-800">
      hello how are you
    </span> */}
  </div>
  </>
  );
}
