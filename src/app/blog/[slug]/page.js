import SingleBlogContainer from './SingleBlogContainer';

// We keep these static definitions to support static export and initial SEO at build time
const BLOG_POSTS = [
  {
    slug: "transforming-urban-waste-manbhar-project",
    title: "Transforming Urban Waste: The Journey of Uboontu’s Manbhar Project",
    category: "Waste Management"
  },
  {
    slug: "understanding-3rs-reduce-reuse-recycle",
    title: "Understanding the 3Rs: Reduce, Reuse, Recycle in Modern Communities",
    category: "Circular Economy"
  },
  {
    slug: "empowering-youth-environmental-education",
    title: "Empowering Youth: The Role of Environmental Education in Schools",
    category: "Community Development"
  }
];

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Blog | Uboontu Foundation',
      description: 'Read articles and updates from Uboontu Foundation.'
    };
  }
  
  return {
    title: `${post.title} | Uboontu Foundation Blog`,
    description: `Read about ${post.title} under the ${post.category} initiative by Uboontu Foundation.`,
  };
}

export default function SingleBlogPostPage({ params }) {
  return <SingleBlogContainer slug={params.slug} />;
}
