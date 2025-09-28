import { baseUrl } from "./config";
import { getToken } from "./token";

export const getProductData = () => {
  const myHeaders = new Headers();
  getToken() ? myHeaders.append("Authorization", `Bearer ${getToken()}`) : "";
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${baseUrl}/products/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const getCategoyData = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/category/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const getProductDetail = (id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/product/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
};

export const getFilterCategoryData = (id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/products/?category=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
};

export const getAnnouncement = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`${baseUrl}/announcements/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => console.error(error));
};
