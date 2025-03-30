import Link from "next/link";
import "./PostFeedItem.styles.scss";
import Image from "next/image";

interface PostFeedItemProps {
  post: any;
}

const prefixes = {
  movie: "watched",
  tvshow: "watched",
  album: "listened to",
  game: "played",
  book: "read",
};

const PostFeedItem = ({ post }: PostFeedItemProps) => {
  const { _id, user, media } = post;
  return (
    <li className="post-feed-item" key={_id}>
      <div className="user-image-container">
        <img src={user.image} />
      </div>

      <div className="content-container">
        <div className="content-title">
          <p>{user.username}</p>
          <p className="prefix">&nbsp;{prefixes[media.type]}&nbsp;</p>
          <p>{media.title}</p>
        </div>
        <div className="post-details">
          <Link href={`/${media.type}/${media._id}`}>
            <Image alt={`${media.type}: ${media.title}`} src={media.image} width={50} height={80} />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostFeedItem;
