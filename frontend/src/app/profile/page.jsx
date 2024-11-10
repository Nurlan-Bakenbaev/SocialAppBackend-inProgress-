// pages/profile.js
import Image from "next/image";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full  shadow-xl rounded-lg overflow-hidden">
        <div className="h-40 bg-blue-500"></div>

        <div className="p-4 flex flex-col items-center">
          <div className="w-40 h-40 -mt-16 rounded-full  ring-4 ring-slate-400 overflow-hidden">
            <Image
              src="/profile-pic.jpg"
              alt="Profile Picture"
              width={96}
              height={96}
            />
          </div>
          <h1 className="text-2xl font-semibold mt-2">John Doe</h1>
          <p className="text-gray-500">@johndoe</p>
          <p className="text-center mt-2">
            Frontend Developer | Tech Enthusiast | Coffee Lover
          </p>
          <div className="flex mt-4 space-x-4">
            <button className="btn btn-primary">Follow</button>
            <button className="btn btn-outline">Message</button>
          </div>
        </div>
        <div className="grid grid-cols-3 text-center border-t border-gray-200">
          <div className="py-4">
            <span className="font-semibold">123</span>
            <p className="text-gray-500">Posts</p>
          </div>
          <div className="py-4">
            <span className="font-semibold">456</span>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="py-4">
            <span className="font-semibold">789</span>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>Just learned about Next.js and loving it! 🚀</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>Exploring Tailwind CSS components with DaisyUI 🌸</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
