import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import Navbar from './Navbar';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        price: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sansevieria_trifasciata_Prain.jpg/480px-Sansevieria_trifasciata_Prain.jpg',
        description: 'Produces oxygen at night, improving air quality.',
      },
      {
        name: 'Spider Plant',
        price: 12,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_-_houseplant.jpg/480px-Chlorophytum_comosum_-_houseplant.jpg',
        description: 'Filters formaldehyde and xylene from the air.',
      },
      {
        name: 'Peace Lily',
        price: 18,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/480px-Spathiphyllum_cochlearispathum_RTBG.jpg',
        description: 'Removes mold spores and purifies the air.',
      },
      {
        name: 'Boston Fern',
        price: 14,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Boston_fern_ne1.jpg/480px-Boston_fern_ne1.jpg',
        description: 'Acts as a natural humidifier and air purifier.',
      },
      {
        name: 'Rubber Plant',
        price: 20,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ficus_elastica_-_Rubber_plant.jpg/480px-Ficus_elastica_-_Rubber_plant.jpg',
        description: 'Absorbs and breaks down harmful chemicals.',
      },
      {
        name: 'Aloe Vera',
        price: 10,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/480px-Aloe_vera_flower_inset.png',
        description: 'Releases oxygen and absorbs carbon dioxide at night.',
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        price: 16,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Schopf-Lavendel.jpg/480px-Schopf-Lavendel.jpg',
        description: 'Calming fragrance that reduces anxiety and stress.',
      },
      {
        name: 'Jasmine',
        price: 19,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_polyanthum.jpg/480px-Jasminum_polyanthum.jpg',
        description: 'Sweet tropical scent, great for indoor spaces.',
      },
      {
        name: 'Rosemary',
        price: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rosemary_bush.jpg/480px-Rosemary_bush.jpg',
        description: 'Fresh herbal scent that boosts memory and focus.',
      },
      {
        name: 'Mint',
        price: 9,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Mint-leaves-2007.jpg/480px-Mint-leaves-2007.jpg',
        description: 'Crisp cool aroma that refreshes any room.',
      },
      {
        name: 'Gardenia',
        price: 22,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Gardenia_jasminoides2.jpg/480px-Gardenia_jasminoides2.jpg',
        description: 'Rich floral scent perfect for living areas.',
      },
      {
        name: 'Lemon Balm',
        price: 11,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg/480px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg',
        description: 'Lemony scent that soothes and uplifts mood.',
      },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      {
        name: 'Citronella',
        price: 13,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cymbopogon_nardus.jpg/480px-Cymbopogon_nardus.jpg',
        description: 'Naturally repels mosquitoes with its strong scent.',
      },
      {
        name: 'Basil',
        price: 8,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Basil-Basilico-Ocimum_basilicum-albahaca.jpg/480px-Basil-Basilico-Ocimum_basilicum-albahaca.jpg',
        description: 'Repels flies and mosquitoes indoors and outdoors.',
      },
      {
        name: 'Catnip',
        price: 10,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Catnip_cat.jpg/480px-Catnip_cat.jpg',
        description: 'More effective than DEET at repelling mosquitoes.',
      },
      {
        name: 'Marigold',
        price: 7,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Marigold_Bedding.jpg/480px-Marigold_Bedding.jpg',
        description: 'Deters aphids, whiteflies, and garden pests.',
      },
      {
        name: 'Chrysanthemum',
        price: 14,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chrysanthemum_x_morifolium_-_2.jpg/480px-Chrysanthemum_x_morifolium_-_2.jpg',
        description: 'Contains pyrethrin, a natural insecticide.',
      },
      {
        name: 'Lemongrass',
        price: 12,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Lemongrass.jpg/480px-Lemongrass.jpg',
        description: 'Contains citronella oil that repels insects.',
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const isInCart = (name) => {
    return cartItems.some((item) => item.name === name) || addedItems[name];
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <>
      <Navbar />
      <div className="product-list-page">
        {plantCategories.map((cat) => (
          <div key={cat.category} className="category-section">
            <h2 className="category-title">{cat.category}</h2>
            <div className="plants-grid">
              {cat.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <span className="sale-badge">SALE</span>
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-card-body">
                    <h3>{plant.name}</h3>
                    <p className="plant-price">${plant.price}</p>
                    <p className="plant-description">{plant.description}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;