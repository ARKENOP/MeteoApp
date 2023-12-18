import axios from 'axios'

export default class Api {
  token = "a57b8ca8761ad1b7e9c277651186388395fdcb91ac776045731b0d9ea435caaa"

  async search(city) {
    const url =
      'https://api.meteo-concept.com/api/location/cities?token=' +
      this.token +
      '&search=' +
      city
    return await axios.get(url).then((response) => response.data)
  }

  async getMeteoForCityFor5Days(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily?token=' +
      this.token +
      '&insee=' +
      insee

    const result = await axios.get(url).then((response) => response.data)

    return result.forecast.slice(0,6)
  }

  async getMeteoForCityForNextHour(insee) {
    const url =
      'https://api.meteo-concept.com/api/forecast/daily/periods?token=' +
      this.token +
      '&insee=' +
      insee
    return await axios.get(url).then((response) => response.data)
  }
}
