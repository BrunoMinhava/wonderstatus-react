import { useParams } from 'react-router-dom';
import { waterProductDetails } from '../data/water-products';
import PageMeta from '../components/PageMeta';
import ProductDetail from '../components/ProductDetail';
import NotFound from './NotFound';

const relatedSlugs = {
  'water-75': ['water-75-xl', 'water-300', 'pre-tratamento', 'watercontrol'],
  'water-75-xl': ['water-75', 'water-300', 'watercontrol', 'waterguard'],
  'water-300': ['water-75-xl', 'watercontrol', 'waterguard', 'pre-tratamento'],
  watercontrol: ['water-75-xl', 'water-300', 'dispenser', 'waterguard'],
  dispenser: ['watercontrol', 'waterguard', 'water-75-xl', 'water-300'],
  waterguard: ['watercontrol', 'dispenser', 'water-300', 'pre-tratamento'],
  'pre-tratamento': ['water-75-xl', 'water-300', 'watercontrol', 'waterguard']
};

export default function ProdutoDetalhe() {
  const { slug } = useParams();
  const product = waterProductDetails[slug];

  if (!product) return <NotFound />;

  const related = (relatedSlugs[slug] || [])
    .map((s) => waterProductDetails[s])
    .filter(Boolean)
    .map((p) => ({
      slug: `/produtos/${p.slug}`,
      name: p.name,
      image: (p.images && p.images[0]?.src) || p.image,
      kicker: p.kicker,
      description: p.subtitle
    }));

  return (
    <>
      <PageMeta
        title={product.name}
        description={product.subtitle || product.description}
        path={`/produtos/${slug}`}
        image={product.images?.[0]?.src || product.image}
      />
      <ProductDetail
        product={product}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Sistemas de Produção de Água', to: '/agua' },
          { label: 'Produtos', to: '/produtos' },
          { label: product.name }
        ]}
        relatedProducts={related}
      />
    </>
  );
}
