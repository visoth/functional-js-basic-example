import {
  map,
  group,
  filter,
  sort,
  composeP,
  trace
} from "../helpers/functional";

const fetchAsJson = url => fetch(url).then(r => r.json());

const filterByAge = (min, max) => user => {
  return user.dob.age > min && user.dob.age < max ? user : null;
};

const formatUser = ({
  name: { title, first, last },
  dob: { age },
  email,
  picture
}) => ({
  name: `${first} ${last}`,
  age,
  email,
  picture: picture.thumbnail
});

const sortByCity = ([a], [b]) => (a > b ? 1 : a < b ? -1 : 0);

const formatUsersForCity = ([name, users]) => ({
  name,
  users: map(formatUser, users)
});

export default composeP(
  map(formatUsersForCity),
  sort(sortByCity),
  group(user => user.location.city),
  filter(user => user.location.city === "marseille"),
  trace("user by age"),
  filter(filterByAge(29, 40)),
  ({ results }) => results,
  fetchAsJson
);
