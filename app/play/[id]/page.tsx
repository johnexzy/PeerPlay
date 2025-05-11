import { fetchPlayById } from "@/app/lib/data";
import AppPlayer from "@/templates/AppPlayer";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const data = await fetchPlayById(params.id);
  if (!data) {
    notFound();
  }
  
  // Force revalidation in development
  if (process.env.NODE_ENV === 'development') {
    await Promise.resolve(); // Forces dynamic rendering
  }

  return (
    <div>
      <AppPlayer roomId={`${data.room_id}`} url={data.link} />
    </div>
  );
}

export default Page;
