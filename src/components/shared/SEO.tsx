import Helmet from 'next/head';

export default function SEO({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Helmet>
      <title>Trip</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
}
