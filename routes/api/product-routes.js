const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try { const productData = await 
    Product.findAll();
    res.status(200).json(productData);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try { const productData = await 
    Product.findByPk(req.params.id,{
      include:[{model:Category}],
    });

    if (!productData) {
      res.status(404).json({ message:'No product found with this id'});
      return;
    }
    res.status(200).json(productData);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  // find one category by its `id` value
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }*/

  try{
    const productData = await Product.create(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tagIds,
    },
    {
      include: [
        { model: Category },
        { model: Tag, through: { model: ProductTag } },
      ],
      
    });
    
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(`Product posted!`)
    }
  catch(err) {
        console.log(err);
        res.status(400).json(err);
      };
  }
);

// update product
router.put('/:id', async (req, res) => {
  // update product data
try{
  const productData = await Product.update({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id,
  },
   {
    where: {
      id: req.params.id,
    },
  })
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }
      return res.json(`Product updated!`);
    
  }
  catch(err){
    if (!productData){
      return res.status(400).json(err);
    }
  }
});

router.delete('/:id', async (req, res) => {
  try { const productData = await 
    Product.destroy ({
      where:{ id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message:'No products found with this id'});
      return;
    }
    res.status(200).json(`Product deleted!`)

    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;
