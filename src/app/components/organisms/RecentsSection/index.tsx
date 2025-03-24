import Link from "next/link";
import "./RecentsSection.styles.scss";
import uppercaseFirst from "@app/helpers/uppercaseFirst";
import CenteredGrid from "@app/components/atoms/CenteredGrid";

interface RecentsSectionProps {
  album: any;
  book: any;
  game: any;
  movie: any;
  tvshow: any;
}

const RecentsSection = ({
  album,
  book,
  game,
  movie,
  tvshow,
}: RecentsSectionProps) => {
  const items = [album, book, game, movie, tvshow].filter((item) => item);
  return (
    <div className="recents-section">
      <h1>Recents</h1>

      <div className="posts-container">
        {items.map(({ media }) => {
          return (
            <Link
              href={{
                pathname: `/${media.type}/${media._id}`,
                query: { media },
              }}
              passHref
              key={media._id}
            >
              <h2>{uppercaseFirst(media.type)}</h2>
              <img src={media.image} />
              <p>{media.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentsSection;
