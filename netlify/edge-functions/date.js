export default async (request, context) => {
  return await fetch('https://data.ncaa.com/casablanca/schedule/basketball-men/d1/today.json')
    .then((response) => response.json())
    .then((data) => {
      return context.json(data);
    });
};
