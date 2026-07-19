import { supabase } from '../lib/supabaseClient';

const WHATSAPP_NUMBER = '50937955577';

function buildWhatsappLink(product) {
  const agentLine = product.agents
    ? `\nAjan: ${product.agents.full_name} (${product.agents.agent_code})`
    : '';
  const message = `Bonjou! Mwen enterese nan pwodwi sa a:\n\n${product.name}\nPri: $${product.price_usd} USD (≈ ${product.price_htg} HTG)${agentLine}\n\nEske li disponib?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default async function HomePage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, icon')
    .order('name');

  const { data: products, error } = await supabase
    .from('products')
    .select(
      `
      id, name, price_usd, price_htg, image_url,
      categories ( name, icon ),
      agents ( full_name, agent_code )
    `
    )
    .order('created_at', { ascending: false });

  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-mark">🛒</div>
          <div className="logo-text">
            <div className="l1">
              SFE <span>Shop Store.llc</span>
            </div>
            <div className="l2">The real shop for shopping</div>
          </div>
        </div>
      </header>

      <main>
        <div className="hero">
          <h1>
            Achte bon jan pwodwi.
            <br />
            Vann yo, <em>touche komisyon.</em>
          </h1>
          <p>
            SFE Shop Store se yon sèl platfòm kote kliyan achte pwodwi kalite,
            epi kote Ajan Afilye nou yo vann menm pwodwi sa yo pou yo touche
            komisyon.
          </p>
        </div>

        {categories && categories.length > 0 && (
          <div className="cat-strip">
            {categories.map((cat) => (
              <div className="chip" key={cat.id}>
                {cat.icon} {cat.name}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="empty-state">
            Gen yon pwoblèm pou chaje pwodwi yo. ({error.message})
          </div>
        )}

        {!error && (!products || products.length === 0) && (
          <div className="empty-state">
            Pa gen pwodwi ki disponib kounye a. Tounen vin gade pita!
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid">
            {products.map((product) => (
              <div className="product" key={product.id}>
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-img"
                  />
                ) : (
                  <div className="product-img" />
                )}
                <div className="product-body">
                  <div className="product-cat">
                    {product.categories?.icon} {product.categories?.name}
                  </div>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-price">
                    ${product.price_usd}{' '}
                    <small>≈ {product.price_htg} HTG</small>
                  </div>
                  {product.agents && (
                    <div className="product-agent">
                      Vann pa {product.agents.full_name} ·{' '}
                      {product.agents.agent_code}
                    </div>
                  )}
                  <a
                    href={buildWhatsappLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-buy"
                  >
                    Kòmande sou WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        SFE Shop Store.llc — Ansanm, Nou Ka Fè Plis. · WhatsApp: +509
        3795-5577
      </footer>
    </>
  );
}
