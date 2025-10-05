import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Home} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute top-48 right-32 w-8 h-8 bg-purple-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 border-3 border-emerald-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 right-20 w-12 h-12 border-4 border-blue-400 rounded-full opacity-30"></div>

        {/* Floating question marks */}
        <div className="absolute top-1/4 left-16 text-6xl text-gray-300 opacity-20 font-bold">?</div>
        <div className="absolute top-1/3 right-24 text-4xl text-gray-300 opacity-30 font-bold">?</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl text-gray-300 opacity-25 font-bold">?</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-200 leading-none mb-4">404</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}