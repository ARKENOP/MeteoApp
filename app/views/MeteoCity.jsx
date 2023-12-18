import * as React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList} from 'react-native'
import Api from '../models/Api'
import weatherCode from '../services/weatherCode'
import TemperatureConverter from './components/TemperatureConverter';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const MeteoCity = ({ navigation, route }) => {
  const meteoAPI = new Api()

  const [isCelsius, setIsCelsius] = React.useState(true);

  const handleTemperatureConversion = (toCelsius) => {
    setIsCelsius(toCelsius);
  };

  const [meteoCityFor5Days, setMeteoCityFor5Days] = React.useState({})
  //Objet factice pour eviter les erreurs dans le code
  const [meteoCity, setMeteoCity] = React.useState({
    city: { name: '' },
    forecast: [
      [],
      [],
      [],
      [
        {
          cp: 93170,
          datetime: '2022-03-01T19:00:00+0100',
          day: 0,
          dirwind10m: 113,
          gust10m: 22,
          gustx: 22,
          insee: '93006',
          latitude: 48.8691,
          longitude: 2.4227,
          period: 3,
          probafog: 0,
          probafrost: 10,
          probarain: 20,
          probawind70: 0,
          probawind100: 0,
          rr1: 0,
          rr10: 0,
          temp2m: 10,
          weather: 5,
          wind10m: 5,
        },
      ],
    ],
  })
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    getMeteoForCity(route.params.insee)
    getMeteoForCity5days(route.params.insee)
  }, [])

  const getMeteoForCity = async (insee) => {
    const result = await meteoAPI.getMeteoForCityForNextHour(insee)
    setMeteoCity(result)
    setLoading(false)
  }

  const getMeteoForCity5days = async (insee) => {
    const result = await meteoAPI.getMeteoForCityFor5Days(insee)
    setMeteoCityFor5Days(result)
  }

  const dateFormat = (dateISO) => {
    const date = new Date(dateISO)
    const dateFormat =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() //prints expected format.

    return dateFormat
  }
  const renderItem = ({ item }) => (
    <View style={styles.previsionView} key={item.datetime}>
      <Text style={styles.previsionTitle}>{dateFormat(item.datetime)}</Text>
      <Icon name={getWeatherIcon(item.weather)} size={30} color="#000" />
      <Text>{weatherCode[item.weather]}</Text>
      <Text>
        T°Max : {item.tmax} T°Min : {item.tmin}
      </Text>
      <Text>
        Rafale de vent à 10 mètres : {item.wind10m}
        {' km/h '}
      </Text>
    </View>
  )

  return (
    <>
      {!loading && (
        <>
          <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {meteoCity.city.name} {isCelsius ? meteoCity.forecast[0][3].temp2m : (meteoCity.forecast[0][3].temp2m * 9/5) + 32}˚
              </Text>
              <Text style={styles.subtitle}>
                {weatherCode[meteoCity.forecast[0][3].weather]} <Icon name={getWeatherIcon(meteoCity.forecast[0][3].weather)} size={30} color="#000" />
              </Text>
              <TemperatureConverter onConvert={handleTemperatureConversion}/>
            </View>
            <View style={styles.weatherContainer}>
              <FlatList
                data={meteoCityFor5Days}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      )}
    </>
  )
}
const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return 'sun-o'; // Soleil
    case 1:
      return 'cloud'; // Peu nuageux
    case 2:
      return 'cloud';
    case 3:
      return 'cloud';
    case 4:
      return 'cloud';
    case 5:
      return 'cloud';
    case 6:
      return 'cloud';
    case 7:
      return 'cloud'; 
    case 10:
      return 'cloud';
    case 11:
      return 'cloud';
    case 12:
      return 'cloud';
    case 13:
      return 'cloud';
    case 14:
      return 'cloud';
    case 15:
      return 'cloud';
    case 16:
      return 'cloud'; 
    case 20:
      return 'snowflake-o';
    case 21:
      return 'snowflake-o';
    case 22:
      return 'snowflake-o'; 
    case 30:
      return 'snowflake-o';
    case 31:
      return 'snowflake-o';
    case 32:
      return 'snowflake-o'; 
    case 40:
      return 'tint';
    case 41:
      return 'tint';
    case 42:
      return 'tint';
    case 43:
      return 'tint';
    case 44:
      return 'tint';
    case 45:
      return 'tint';
    case 46:
      return 'tint';
    case 47:
      return 'tint';
    case 48:
      return 'tint'; 
    case 60:
      return 'tint';
    case 61:
      return 'tint';
    case 62:
      return 'tint'; 
    case 63:
      return 'snowflake-o';
    case 64:
      return 'snowflake-o';
    case 65:
      return 'snowflake-o';
    case 66:
      return 'snowflake-o';
    case 67:
      return 'snowflake-o';
    case 68:
      return 'snowflake-o'; 
    case 70:
      return 'tint';
    case 71:
      return 'tint';
    case 72:
      return 'tint';
    case 73:
      return 'tint';
    case 74:
      return 'tint';
    case 75:
      return 'tint';
    case 76:
      return 'tint';
    case 77:
      return 'tint';
    case 78:
      return 'tint'; 
    case 100:
      return 'bolt';
    case 101:
      return 'bolt';
    case 102:
      return 'bolt';
    case 103:
      return 'bolt';
    case 104:
      return 'bolt';
    case 105:
      return 'bolt';
    case 106:
      return 'bolt';
    case 107:
      return 'bolt';
    case 108:
      return 'bolt'; 
    case 120:
      return 'bolt';
    case 121:
      return 'bolt';
    case 122:
      return 'bolt';
    case 123:
      return 'bolt';
    case 124:
      return 'bolt';
    case 125:
      return 'bolt';
    case 126:
      return 'bolt';
    case 127:
      return 'bolt';
    case 128:
      return 'bolt'; 
    case 130:
      return 'bolt';
    case 131:
      return 'bolt';
    case 132:
      return 'bolt';
    case 133:
      return 'bolt';
    case 134:
      return 'bolt';
    case 135:
      return 'bolt';
    case 136:
      return 'bolt';
    case 137:
      return 'bolt';
    case 138:
      return 'bolt'; 
    case 140:
      return 'bolt';
    case 141:
      return 'bolt';
    case 142:
      return 'bolt'; 
    case 210:
      return 'tint';
    case 211:
      return 'tint';
    case 212:
      return 'tint'; 
    case 220:
      return 'snowflake-o';
    case 221:
      return 'snowflake-o';
    case 222:
      return 'snowflake-o'; 
    case 230:
      return 'tint';
    case 231:
      return 'tint';
    case 232:
      return 'tint';
    case 235:
      return 'tint'; 
    default:
      return 'question'; // Cas par défaut
  }
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
  previsionView: {
    backgroundColor: '#98D7DC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previsionTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
})

export default MeteoCity