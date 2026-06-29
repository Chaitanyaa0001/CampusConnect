import SignupForm from "@/features/auth/components/SignupForm";
import ToggleButton from "@/shared/components/theme/ToggleButton";
import { FcCheckmark } from "react-icons/fc";

const features = [
  {
    title: "Campus Community",
    desc: "Connect with students through public discussions and real-time conversations.",
  },
  {
    title: "Smart Mobility",
    desc: "Share carpools and rent vehicles safely within your college community.",
  },
  {
    title: "Student Collaboration",
    desc: "Find teammates for projects, hackathons, startups, and research opportunities.",
  },
];

export default function SignupRoute() {
  return (
    <main className="min-h-screen flex bg-white text-gray-900 dark:bg-[#1E2939] dark:text-gray-100 transition-colors relative">
      {/* Theme Toggle */}
      <div className="absolute  top-4 right-4">
        <ToggleButton />
      </div>

      {/* Left Section - Features */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-12 bg-gray-50 dark:bg-gray-800 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
         Connect With Your <span className="text-blue-700 dark:text-blue-400">Campus Community</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Join your college's all-in-one platform to discover carpools, vehicle rentals, project collaborations, public discussions, and lost & found services.        </p>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <FcCheckmark className="mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo + Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 mt-2 dark:to-blue-300 shadow-lg">
                <span className="text-white dark:text-gray-900 font-bold text-lg">CC</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account and discover AI-powered internships
            </p>
          </div>

         <div className="m-2">
                      <SignupForm />

         </div>
        </div>
      </div>
    </main>
  );
}
