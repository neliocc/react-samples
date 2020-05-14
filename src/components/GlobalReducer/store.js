import React from 'react';

export const dogs = [
    {
      name: "Harry",
      image: "https://images.dog.ceo/breeds/vizsla/n02100583_10960.jpg",
      praises:0
    },
    {
      name: "Hermione",
      image: "https://images.dog.ceo/breeds/husky/n02110185_1511.jpg",
      praises:0
    }
  ];
const GlobalContext=React.createContext({
    dogs
});

export default GlobalContext;

