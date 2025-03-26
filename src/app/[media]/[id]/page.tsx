import { notFound } from "next/navigation";

interface MediaPageProps {
  params: {
    id: string;
    media: string
  };
}

const MediaPage = async ({ params }: MediaPageProps) => {
  const { media, id } = await params;
  const allowedPaths = ['album', 'book', 'game', 'movie', 'tvshow']

  if (!allowedPaths.includes(media)) return notFound()

  const mediaItem = await (
    (await fetch(`${process.env.BASE_URL}/api/media/${id}`)) || {}
  ).json();

  if (mediaItem && mediaItem.status === 404) {
    return notFound();
  }

  console.log(mediaItem)

  return <h1>{mediaItem.title}</h1>;
};

export default MediaPage;
