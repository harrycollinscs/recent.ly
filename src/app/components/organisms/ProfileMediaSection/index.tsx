import uppercaseFirst from "@app/helpers/uppercaseFirst";
import Link from "next/link";
import "./ProfileMediaSection.styles.scss";

interface ProfileMediaSectionProps {
  title?: string;
  items: any[];
}

const ProfileMediaSection = ({ title, items }: ProfileMediaSectionProps) => {
  return (
    <section className="media-section">
      {title && <h1>{title}</h1>}

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
    </section>
  );
};

export default ProfileMediaSection;
