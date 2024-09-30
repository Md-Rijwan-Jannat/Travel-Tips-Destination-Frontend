import React from "react";

export default function LoginRightContent() {
  return (
    <div className="w-full md:w-[500px] xl:w-[530px] p-8 flex flex-col justify-center items-center rounded-r-lg relative overflow-hidden">
      {/* Rainbow Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 to-pink-500 opacity-50 blur-2xl"></div>

      {/* Foreground Content */}
      <div className="relative text-center z-10">
        <h3 className="text-3xl font-bold text-black">
          Welcome again our design community
        </h3>
        <p className="mt-2 text-default-600">
          Thousands of designers trust us to deliver the best mockups in
          minutes.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          {/* User avatars */}
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User 1"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="User 2"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/46.jpg"
              alt="User 3"
            />
          </div>
          <span className="text-default-500 text-sm">Join 60,000+ users</span>
        </div>
      </div>
    </div>
  );
}
