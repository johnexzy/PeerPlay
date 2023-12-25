import { fetchPlayById } from '@/app/lib/data';
import AppPlayer from '@/templates/AppPlayer';
import { notFound } from 'next/navigation';

async function Page({ params } : { params: { id: string }}) {
  const data = await fetchPlayById(params.id)
  if (!data) {
    notFound();
  }
  return (
    <div>

     {data && <AppPlayer roomId={data.room_id} url={data.link} />}
    </div>
  )
}

export default Page