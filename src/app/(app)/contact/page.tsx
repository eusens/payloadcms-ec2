import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, MessageSquare,Truck,
  ShoppingCart, ShoppingBag,Headphones,LaptopMinimalCheck
} from "lucide-react";

export default function ContactPage() {
  const features = [
    {
      icon: Truck,
      title: "Fast SHIPPING",
      subtitle: "From All around the world",
    },
    {
      icon: ShoppingCart,
      title: "Order Online",
      subtitle: "From any where",
    },
    {
      icon: Headphones,
      title: "24/7 SUPPORT",
      subtitle: "Unlimited Support",
    },
    {
      icon: LaptopMinimalCheck,
      title: "100% SAFE",
      subtitle: "View our benefits",
    },
    {
      icon: ShoppingBag,
      title: "FREE RETURNS",
      subtitle: "Track or off orders",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        We are here to answer any questions you may have about our products and
        services. Reach out to us and we&apos;ll respond as soon as we can.
      </p>

      {/* Contact Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
  {/* Call */}
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
    <Phone className="w-8 h-8 mx-auto mb-3 text-blue-600" />
    <h2 className="font-semibold text-lg mb-2">Call Us</h2>
    <p className="text-gray-700">+86 137 6081 2861</p>
    <p className="text-gray-700">Mon - Fri, 9am - 6pm</p>
  </div>

  {/* Email */}
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
    <Mail className="w-8 h-8 mx-auto mb-3 text-blue-600" />
    <h2 className="font-semibold text-lg mb-2">Email Us</h2>
    <p className="text-gray-700 break-words">sales@panasonicservomotor.com</p>
    {/* <p className="text-gray-700">support@newsinoenergy.com</p> */}
  </div>

  {/* Visit */}
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
    <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
    <h2 className="font-semibold text-lg mb-2">Address</h2>
    <p className="text-gray-700">2304,building 4,93# XingHai Rd</p>
    <p className="text-gray-700">Guangzhou, China</p>
  </div>

  {/* 🟢 WhatsApp */}
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
    <MessageCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
    <h2 className="font-semibold text-lg mb-2">WhatsApp</h2>
    <a
      href="https://wa.me/8613760812861" 
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 font-medium hover:underline"
    >
      Chat on WhatsApp
    </a>
    <p className="text-gray-700 mt-2">+86 137 6081 2861</p>
  </div>

  {/* 🟢 WeChat */}
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
    <MessageSquare className="w-8 h-8 mx-auto mb-3 text-green-600" />
    <h2 className="font-semibold text-lg mb-2">WeChat</h2>
    {/* <p className="text-gray-700 mb-2">Scan to add</p> */}
    <Image
      src="https://sanityimages.s3.us-west-2.amazonaws.com/IMG_9423.jpeg" 
      alt="WeChat QR"
      width={120}
      height={40}
      priority   // optional: ensures above-the-fold images load faster
      className="h-25 w-auto"
    />
  </div>
</div>


      {/* Map Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image
          src="/images/Oil-Refining-Process.webp" // Replace with your static map image
          alt="Map location"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-100 py-10 mt-12">
      <div className="bg-gray-100 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {features.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <item.icon className="w-16 h-16 mb-3 text-blue-600" />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
}