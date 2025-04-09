"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BlogPost() {
  return (
    <section className="py-10">
      <div className="bg-white max-w-6xl mx-auto items-center border shadow-sm rounded-2xl py-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-12 group ml-10 sm:ml-36 pt-10"
        >
          <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Blog
        </Link>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Optional Image */}
          <div className="w-full flex justify-center items-center mb-6">
            <img
              src="https://source.unsplash.com/800x400/?nature"
              alt="Post Cover"
              className="w-auto max-h-96 object-cover rounded"
            />
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl sm:text-6xl text-left font-thin font-sans text-emerald-600 leading-tight">
              The Power of Nature in Design
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-4 gap-6 mt-6">
              {/* First Column (1/4) */}
              <div className="col-span-1 space-y-1">
                <div className="flex flex-col border-t border-black/40 pt-4 w-full">
                  {/* Author */}
                  <div className="text-start w-full pb-4">
                    <p className="text-gray-700 text-md font-thin px-1.5 rounded-full">
                      by John Doe
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-start border-t border-black/40 py-4 w-full">
                    <p className="text-gray-700 text-md font-thin px-1.5 rounded-full">
                      April 9, 2025
                    </p>
                  </div>

                  {/* Tag */}
                  <div className="text-start border-t border-black/40 py-4 w-full">
                    <p className="bg-black/10 inline-block px-2 py-1 rounded text-md font-thin">
                      Nature
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Column (3/4) */}
              <div className="col-span-3 prose prose-gray max-w-none">
                <hr className="bg-black/40 border-none h-[1px]" />
                <div className="py-4 space-y-4">
                  <p>
                    In recent years, nature has become a major inspiration in
                    modern design. From organic architecture to sustainable
                    products, the influence of the natural world is undeniable.
                  </p>
                  <p>
                    Designers are now more conscious about materials,
                    ecosystems, and the emotional impact of their creations. The
                    fusion of form, function, and environmental awareness marks
                    a new era in innovation.
                  </p>
                  <p>
                    Whether it’s biomimicry or earthy color palettes, nature’s
                    presence in creative work is shaping the future — and it’s
                    beautiful to witness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
