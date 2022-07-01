const axios = require('axios')
const Restaurant = require('../models/Restaurant.model')
require('../db/index')

async function getRestaurantInfoAndCreate(page) {
  try {
    const options = {
      method: 'GET',
      url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/list',
      params: {
        queryPlaceValueCityId: '415144',
        pageSize: '10',
        pageNumber: page,
      },
      headers: {
        'X-RapidAPI-Key': 'a7fd2d32fcmsh84dd472d88977dep1844efjsn447463b82aa1',
        'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com',
      },
    }

    const response = await axios.request(options)

    console.log(response.data.data.map((resto) => resto.address.locality))

    const restaurantsToCreate = response.data.data.map((restaurant) => {
      const {
        address: { street, locality, country, postalCode },
        priceRange,
        mainPhotoSrc,
        name,
        servesCuisine,
        geo,
      } = restaurant
      const formattedRestaurant = {
        name: name,
        localisation: {
          address: { street_name: street, city: locality, country: country },
        },
        priceRange: priceRange,
        mainImage: mainPhotoSrc,
        cuisine: servesCuisine,
        geo: geo,
        galleryPictures: photosCarousel,
      }
      return formattedRestaurant
    })

    const createdRestaurant = await Restaurant.create(restaurantsToCreate)
    console.log(createdRestaurant)
  } catch (error) {
    console.error(error)
  }
}

async function seed() {
  await Restaurant.deleteMany()
  let i = 0
  const intervalId = setInterval(async () => {
    i += 1
    if (i > 100) {
      clearInterval(intervalId)
    }
    await getRestaurantInfoAndCreate(i)
  }, 1000)
  mongoose.connection.close()
}
seed()
