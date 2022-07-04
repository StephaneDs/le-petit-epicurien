const axios = require('axios')
const { default: mongoose } = require('mongoose')
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
        'X-RapidAPI-Key': 'ef36f6280bmsh2461c25d3329b7ap1e0208jsn739d4296f147',
        'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com',
      },
    }

    const response = await axios.request(options)

    // console.log(response.data.data.map((resto) => resto.address.locality))
    if (!response.data.data || !response.data.data.length) {
      console.log('response.data.data was not an array', response.data.data)
    }

    const restaurantsToUpsert = response.data.data.map((restaurant) => {
      const {
        address: { street, locality, country, postalCode },
        priceRange,
        mainPhotoSrc,
        name,
        hasLoyaltyProgram,
        slug,
        servesCuisine,
        geo,
        photosCarousel,
        marketingOffer,
      } = restaurant
      const formattedRestaurant = {
        name: name,
        localisation: {
          address: { street_name: street, city: locality, country: country },
        },
        slug: slug,
        priceRange: priceRange,
        mainImage: mainPhotoSrc,
        cuisine: servesCuisine,
        geo: geo,
        galleryPictures: photosCarousel,
        loyaltyProgram: hasLoyaltyProgram,
        marketingOffer: marketingOffer,
      }
      return {
        updateOne: {
          filter: { slug: slug },
          update: { $set: formattedRestaurant },
          upsert: true, // <<==== upsert in every document
        },
      }
    })

    const createdRestaurant = await Restaurant.collection.bulkWrite(
      restaurantsToUpsert
    )
    const { nUpserted, nModified, nMatched } = createdRestaurant.result
    console.log({ nUpserted, nModified, nMatched })
  } catch (error) {
    console.error(error)
  }
}

const sleep = async (milliseconds) =>
  new Promise((res, rej) => {
    setTimeout(() => res(), milliseconds)
  })

const limit = 100

async function seed() {
  for (let i = 1; i <= limit; i++) {
    console.log('Page', i)
    await getRestaurantInfoAndCreate(i)
    await sleep(250)
  }
  await mongoose.connection.close()
}
seed()
