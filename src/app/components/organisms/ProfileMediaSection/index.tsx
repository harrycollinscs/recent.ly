import uppercaseFirst from "@app/helpers/uppercaseFirst";
import Link from "next/link";
import "./ProfileMediaSection.styles.scss";
import Image from "next/image";

interface ProfileMediaSectionProps {
  title?: string;
  items: any[];
  showType?: boolean;
}

const ProfileMediaSection = ({
  title,
  items,
  showType = false,
}: ProfileMediaSectionProps) => {
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
              {showType && <h2>{uppercaseFirst(media.type)}</h2>}
              <Image
                alt={`${media.type}: ${media.title}`}
                src={media.image}
                width={70}
                height={100}
                priority
                unoptimized={true}
              />

              <p>{media.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileMediaSection;
