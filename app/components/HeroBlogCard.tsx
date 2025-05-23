import Link from "next/link";

type HeroBlogCardProps = {
  id: number;
  title: string;
  categories: string[];  // Changed from single category to array
  date: string;
  author: string;
  cardColor: string;
};

export default function HeroBlogCard({
  id,
  title,
  categories,
  date,
  author,
  cardColor,
}: HeroBlogCardProps) {
  return (
    <div className="h-full min-h-[460px] sm:min-h-[500px] md:min-h-[640px] lg:min-h-[700px]">
      <Link href={`/blog-post/${id}`}>
        <article
          className="relative rounded-xl px-6 py-8 h-full flex flex-col text-black"
          style={{
            backgroundColor: cardColor,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Decorative dots */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-black/20 rounded-full" />
          <div className="absolute top-4 right-4 w-2 h-2 bg-black/20 rounded-full" />

          <div className="flex-1 flex items-center mb-4 w-full">
            <h2 className="text-[45px] font-semibold text-balance whitespace-normal leading-none tracking-normal text-left capitalize">
              {title}
            </h2>
          </div>

          <div className="space-y-4">
            <hr className="bg-black/40 border-none h-[1px]" />

            <div className="space-y-2">
              <p className="text-black/80">{author}</p>
              <hr className="bg-black/40 border-none h-[.5px]" />
              <p className="text-black/80">{date}</p>
            </div>

            <hr className="bg-black/40 border-none h-[1px]" />

            {/* Updated categories display */}
            <div className="pt-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-black bg-black/10 inline-block px-2 py-1 rounded text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}