import Navbar from "@/shared/components/navigation/Navbar";
import { FaBrain, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiUsers, FiTarget, FiMail } from "react-icons/fi";
import { LuZap } from "react-icons/lu"; 

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = ["/I1.jpg", "/I2.jpg", "/I3.jpg", "/I4.jpg"];

  const interncards = [
  {
    icon: <FiUsers className="text-5xl text-blue-600" />,
    title: "Public Discussions",
    description:
      "Participate in campus-wide discussions, ask questions, share updates, and engage with fellow students.",
  },
  {
    icon: <LuZap className="text-5xl text-green-600" />,
    title: "Smart Mobility",
    description:
      "Find carpools or rent vehicles within your college community for convenient and affordable travel.",
  },
  {
    icon: <FaBrain className="text-5xl text-purple-600" />,
    title: "Project Collaboration",
    description:
      "Discover teammates for hackathons, semester projects, startups, and research initiatives.",
  },
  {
    icon: <FiTarget className="text-5xl text-red-600" />,
    title: "Lost & Found",
    description:
      "Report and recover lost belongings quickly through a trusted student network.",
  },
];

 const steps = [
  {
    step: "1",
    title: "Create Your Profile",
    description:
      "Sign up using your college email and complete your student profile to access campus-exclusive services.",
  },
  {
    step: "2",
    title: "Explore Campus Services",
    description:
      "Browse carpools, vehicle rentals, project collaborations, public discussions, and lost & found listings.",
  },
  {
    step: "3",
    title: "Connect & Collaborate",
    description:
      "Interact with fellow students through chats, discussions, and collaborative opportunities while building your campus network.",
  },
];

  return (
    <div className="dark:bg-[#314DA2] dark:bg-gradient-to-b from-[#0A0F1C] via-[#101828] to-[#1A2234]">
      <Navbar />
      <div className="w-[90%] lg:w-[85%] mx-auto dark:text-white">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between my-3">
          <div>
            <h1 className="text-4xl lg:text-6xl lg:w-[65%] font-bold mt-20">
              Campus Connect <span className="text-[#466CDD]">Your College, Connected</span>
            </h1>
            <p className="text-xl mt-4 lg:w-[70%] sm:text-[1.5rem] opacity-75 dark:opacity-65">
              Connect with your campus through one powerful platform.
               Find carpools, rent vehicles, recover lost items,
                collaborate on projects, and join public discussions—all designed exclusively for your college community.
            </p>
            <div className="flex flex-col sm:gap-4  items-center sm:flex-row lg:gap-10 w-[100%]">
              <Link href="/login" className="w-full sm:w-auto">
                <button type="button" className="bg-blue-700 px-4 py-3 w-full rounded-[7px] text-white font-semibold mt-4">
                  Start Finding Internships
                </button>
              </Link>
              <Link href= '/login'>
                  <button type="button" className="border border-gray-200 rounded-[7px] w-full sm:w-[100%] lg:w-[100%] cursor-pointer px-5 py-3 mt-4 hover:bg-blue-700 hover:text-white text-[1rem] font-semibold">
                    Post Internships
                  </button>
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <Carousel className="w-[85%] sm:w-[90%] mt-3 lg:w-[60%] mx-auto">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                    <Image src={src} alt={`image${index + 1}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Section 2 */}
        <section className="my-25">
          <h1 className="text-3xl lg:text-6xl font-bold text-center mb-4">
            Why Choose Campus<span className="text-[#466CDD]">Connect</span>?
          </h1>
          <p className="text-center text-lg lg:text-2xl opacity-75 mb-10">
            Experience the future of campus connectivity with our advanced platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {interncards.map((card, index) => (
              <div key={index} className="bg-white h-[300px] w-full dark:bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-start justify-center">
                <div className="mb-6">{card.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{card.title}</h2>
                <p className="text-lg self-start text-gray-600 dark:text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="my-24">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6">
            How Campus<span className="text-[#466CDD]">Connect</span> Works
          </h2>
          <p className="text-center text-lg lg:text-2xl opacity-75 mb-12">
            Get started in minutes and find your perfect campus connection through our streamlined process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((card, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-700 text-white text-2xl font-bold mb-6">{card.step}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16 text-center border-b  border-gray-600 dark:border-gray-100 mx-auto mt-4 w-[100%]">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4">Ready to Connect with Your Campus?</h2>
        <p className="text-lg lg:text-2xl opacity-90 mb-8">
          Join thousands of students using Campus Connect to collaborate, travel smarter, and stay connected with their college community.
        </p>
        <Link href='/login'>
         <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200">
          Join Campus Connect
        </button>
        </Link>
       
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="">
            <div className="flex items-center justify-start gap-2 mb-4">
              <Image src='/logo.png' height={10} width={50} alt="logo" className=""/>
              <h3 className="text-xl font-bold text-gray-900text-white mb-3">Campus Connect</h3>
            </div>
           
            <p>Connecting students through collaboration, mobility, and community-driven campus services.</p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font- text-xl text-white mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="#">Browse Internships</Link></li>
              <li><Link href="#">For Companies</Link></li>
              <li><Link href="#">AI Recommendations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-xl text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-[]">
            <h4 className="font-semibold text-xl text-white mb-3">Connect</h4>
            <div className="flex space-x-4 text-2xl">
              <Link href="https://github.com" target="_blank"><FaGithub /></Link>
              <Link href="https://linkedin.com" target="_blank"><FaLinkedin /></Link>
              <Link href="mailto:someone@example.com"><FiMail /></Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 InternAI. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
