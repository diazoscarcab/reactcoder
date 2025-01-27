import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const categorias = [
  { id: 'paletas', name: 'Paletas de Pádel PRO' },
];

const productos = [
  { id: '1', name: 'Paleta Adidas Adipower', category: 'paletas', description: 'Alta potencia y control.', price: 300 },
  { id: '2', name: 'Paleta Bullpadel Hack', category: 'paletas', description: 'Diseño avanzado para profesionales.', price: 350 },
  { id: '3', name: 'Paleta Nox AT10', category: 'paletas', description: 'Fabricada en carbono 100%.', price: 320 },
  { id: '4', name: 'Paleta Siux Pegasus', category: 'paletas', description: 'Equilibrio perfecto y alta durabilidad.', price: 340 },
  { id: '5', name: 'Paleta Dunlop Inferno', category: 'paletas', description: 'Excelente relación calidad/precio.', price: 280 },
  { id: '6', name: 'Paleta Head Delta Pro', category: 'paletas', description: 'Ideal para jugadores avanzados.', price: 330 },
  { id: '7', name: 'Paleta StarVie Raptor', category: 'paletas', description: 'Control excepcional en el juego.', price: 310 },
  { id: '8', name: 'Paleta Varlion Maxima', category: 'paletas', description: 'Versatilidad para todos los niveles.', price: 290 },
  { id: '9', name: 'Paleta Black Crown Piton', category: 'paletas', description: 'Perfecta para partidas intensas.', price: 270 },
  { id: '10', name: 'Paleta Babolat Viper', category: 'paletas', description: 'Gran potencia y rendimiento.', price: 340 },
  { id: '11', name: 'Paleta Royal Padel M27', category: 'paletas', description: 'Diseño ergonómico y de alto confort.', price: 360 },
  { id: '12', name: 'Paleta Kuikma Precision', category: 'paletas', description: 'Para jugadores en crecimiento.', price: 250 },
];

const NavBar = () => (
  <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
    <h1 style={{ fontSize: '1.5rem' }}>Pádel Premium</h1>
    <nav>
      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          to={`/category/${categoria.id}`}
          style={{ margin: '0 0.5rem', padding: '0.5rem', color: 'white', textDecoration: 'none', backgroundColor: '#555', borderRadius: '4px' }}
        >
          {categoria.name}
        </Link>
      ))}
    </nav>
  </header>
);

const Item = ({ producto }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
    <h3 style={{ fontSize: '1.25rem' }}>{producto.name}</h3>
    <p>{producto.description}</p>
    <Link
      to={`/product/${producto.id}`}
      style={{ marginTop: '0.5rem', display: 'inline-block', color: '#007BFF', textDecoration: 'underline' }}
    >
      Ver detalles
    </Link>
  </div>
);

const ItemList = ({ productos }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    {productos.map((producto) => (
      <Item key={producto.id} producto={producto} />
    ))}
  </div>
);

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const fetchProductos = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (categoryId) {
            resolve(productos.filter((producto) => producto.category === categoryId));
          } else {
            resolve(productos);
          }
        }, 500);
      });
    };

    fetchProductos().then((result) => setProductosFiltrados(result));
  }, [categoryId]);

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Categoría: {categoryId || 'Todos los Productos'}</h2>
      <ItemList productos={productosFiltrados} />
    </div>
  );
};

const ItemDetail = ({ producto }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1.5rem' }}>
    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{producto.name}</h2>
    <p style={{ marginBottom: '1rem' }}>{producto.description}</p>
    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>${producto.price}</p>
    <ItemCount />
    <Link
      to="/"
      style={{
        marginTop: '1rem',
        display: 'inline-block',
        color: 'white',
        backgroundColor: '#007BFF',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
      }}
    >
      Volver al inicio
    </Link>
  </div>
);

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(productos.find((prod) => prod.id === productId));
        }, 500);
      });
    };

    fetchProducto().then((result) => setProducto(result));
  }, [productId]);

  if (!producto) return <p style={{ padding: '1.5rem' }}>Cargando producto...</p>;

  return <ItemDetail producto={producto} />;
};

const ItemCount = () => {
  const [count, setCount] = useState(1);

  const incrementar = () => setCount((prev) => prev + 1);
  const decrementar = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={decrementar} style={{ marginRight: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px' }}>-</button>
      <span>{count}</span>
      <button onClick={incrementar} style={{ marginLeft: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px' }}>+</button>
    </div>
  );
};

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<ItemListContainer />} />
      <Route path="/category/:categoryId" element={<ItemListContainer />} />
      <Route path="/product/:productId" element={<ItemDetailContainer />} />
    </Routes>
  </Router>
);

export default App;
