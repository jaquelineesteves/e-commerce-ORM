const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try { const categoryData = await 
  Category.findAll();
  res.status(200).json(categoryData);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try { const categoryData = await 
    Category.findByPk(req.params.id,{
      include:[{model:Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message:'No category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  // find one category by its `id` value
  res.send('Get one category data');
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try { const categoryData = await 
    Category.create(req.body);
    res.status(200).json(`Category Added!`);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body,{
        where: {
            id:req.params.id
        }
    });
    res.status(200).json(`Category Updated!`);
}
catch (err){
    if (!categoryData){
        return res.status(400).json(err)
    }
}
});

router.delete('/:id', async (req, res) => {
  try { const categoryData = await 
    Category.destroy ({
      where:{ id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message:'No category found with this id'});
      return;
    }
    res.status(200).json(`Category Deleted!`);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  // delete on tag by its `id` value
});
module.exports = router;
