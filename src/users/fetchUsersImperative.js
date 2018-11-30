export default async url => {
  // Fetch users from api
  const response = await fetch(url);
  const users = await response.json();

  // Split users by city
  const cities = [];
  for (const user of users.results) {
    // Filter user by age
    if (user.dob.age < 30 || user.dob.age >= 40) {
      continue;
    }
    // Search for the current city in the result table
    let theCity;
    for (const city of cities) {
      if (city.name === user.location.city) {
        theCity = city;
      }
    }

    // Create new city if not found
    if (!theCity) {
      theCity = {
        name: user.location.city,
        users: []
      };
      cities.push(theCity);
    }

    // Format the user data
    const theUser = {
      name: `${user.name.first} ${user.name.last}`,
      age: user.dob.age,
      email: user.email,
      picture: user.picture.thumbnail
    };
    // Push the user in the city
    if (theCity) {
      theCity.users.push(theUser);
    } else {
      theCity.users = [{ name: user.location.city, users: [theUser] }];
    }
  }

  return cities;
};
