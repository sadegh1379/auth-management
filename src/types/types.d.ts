declare namespace ApiTypes {
  interface UserName {
    title: string;
    first: string;
    last: string;
  }

  interface UserStreet {
    number: number;
    name: string;
  }

  interface UserCoordinates {
    latitude: string;
    longitude: string;
  }

  interface UserTimezone {
    offset: string;
    description: string;
  }

  interface UserLocation {
    street: UserStreet;
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: UserCoordinates;
    timezone: UserTimezone;
  }

  interface UserLogin {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }

  interface UserDOB {
    date: string;
    age: number;
  }

  interface UserRegistered {
    date: string;
    age: number;
  }

  interface UserId {
    name: string;
    value: string | null;
  }

  interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
  }

  interface userResponseInfo {
    seed: string;
    results: number;
    page: number;
    version: string;
  }

  interface userData {
    gender: string;
    name: UserName;
    location: UserLocation;
    email: string;
    login: UserLogin;
    dob: UserDOB;
    registered: UserRegistered;
    phone: string;
    cell: string;
    id: UserId;
    picture: UserPicture;
    nat: string;
  }
}