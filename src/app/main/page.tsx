import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="card card-post">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
          laborum commodi explicabo reprehenderit molestias repellat soluta,
          libero veniam, a id obcaecati illo maxime asperiores error recusandae
          velit accusantium deserunt consectetur.
        </div>
        <div className="card card-post">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
          laborum commodi explicabo reprehenderit molestias repellat soluta,
          libero veniam, a id obcaecati illo maxime asperiores error recusandae
          velit accusantium deserunt consectetur.
        </div>
        <div className="card card-post">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
          laborum commodi explicabo reprehenderit molestias repellat soluta,
          libero veniam, a id obcaecati illo maxime asperiores error recusandae
          velit accusantium deserunt consectetur.
        </div>
      </div>
      
    <Link href="/main/profile">cpcoiqfif</Link>
    </>
  );
}
