import { useEffect, useState } from 'react';
import { 
  Table, 
  Button, 
  Spinner, 
  Alert, 
  Form, 
  InputGroup,
  Pagination,
  Modal
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { useProductStore } from '../../store/productStore';

const ProductList = ({products}) => {
  const {
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 10;

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  // Filter and pagination logic
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Modal handlers
  const handleShowModal = (product = null) => {
    setCurrentProduct(product || {
      name: '',
      category: '',
      subcategory: '',
      description: '',
      price: '',
      productImage: '',
      attributes: {
        hairType: [],
        skinType: [],
        ingredients: []
      }
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  // Delete handlers
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteProduct(productToDelete._id);
    setShowDeleteModal(false);
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleAttributeChange = (e) => {
  //   const { name, value } = e.target;
  //   const [parent] = name.split('.');
    
  //   setCurrentProduct(prev => ({
  //     ...prev,
  //     attributes: {
  //       ...prev.attributes,
  //       [parent]: value.split(',').map(item => item.trim())
  //     }
  //   }));
  // };


  const handleAttributeChange = (e) => {
  const { name, value } = e.target;
  const attributePath = name.split('.'); // This will be ['attributes', 'hairType'] etc.
  
  setCurrentProduct(prev => {
    // Create a deep copy of the attributes object to avoid direct state mutation
    const newAttributes = {
      ...prev.attributes,
      [attributePath[1]]: value.split(',').map(item => item.trim())
    };
    
    return {
      ...prev,
      attributes: newAttributes
    };
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct._id) {
        await updateProduct(currentProduct._id, currentProduct);
      } else {
        await addProduct(currentProduct);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading && products.length === 0) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="product-management-container">
      {/* Header and Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <Button 
          variant="primary"
          onClick={() => handleShowModal()}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Products Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td className="d-flex">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(product)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(product)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct?._id ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                value={currentProduct?.name || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={currentProduct?.category || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                name="subcategory"
                value={currentProduct?.subcategory || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct?.price || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="productImage"
                value={currentProduct?.productImage || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentProduct?.description || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <h5>Attributes</h5>
            <Form.Group className="mb-3">
              <Form.Label>Hair Types (comma separated)</Form.Label>
              <Form.Control
                name="attributes.hairType"
                value={currentProduct?.attributes?.hairType?.join(', ') || ''}
                onChange={handleAttributeChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skin Types (comma separated)</Form.Label>
              <Form.Control
                name="attributes.skinType"
                value={currentProduct?.attributes?.skinType?.join(', ') || ''}
                onChange={handleAttributeChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ingredients (comma separated)</Form.Label>
              <Form.Control
                name="attributes.ingredients"
                value={currentProduct?.attributes?.ingredients?.join(', ') || ''}
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {currentProduct?._id ? 'Update' : 'Save'} Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{productToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;