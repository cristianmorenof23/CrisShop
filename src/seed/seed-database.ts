import prisma from '../lib/prisma'
import { initialData } from './seed';

async function main () {

  await Promise.all([
    //1. borrar las tablas, usamos el promise.all para que se ejecute todo de manera simultanea y no de una en una
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany()
  ])

  const { categories, products } = initialData

  //2. Empezar a generar categorias
  const categoriesData = categories.map( category => ({
    name :category
  }))
  await prisma.category.createMany({
    data : categoriesData
  })

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>)
  console.log(categoriesMap);


  //3. Insertar Productos en BD

  products.forEach( async (product) => {
    const {  type, images, ...rest } = product

    const dbProduct = await prisma.product.create({
      data : {
        ...rest,
        categoryId : categoriesMap[type]
      }
    })

    // insertar images
    const imageData = images.map( image => ({
      url : image,
      productImageId : dbProduct.id
    }))

    await prisma.productImage.createMany({
      data : imageData
    })
  } )
  console.log('seed executed');
}

(() => {
  if(process.env.NODE_ENV === 'production') return  
  main()
})()