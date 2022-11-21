export default async (request, context) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  return await fetch('https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/' + yyyy + '/' + mm + '/' + dd + '/scoreboard.json')
    .then((response) => response.json())
    .then((data) => {
      let game = data.games.find((g) => g.game.title.includes("Baylor"));
      if (!game) {
        return context.json({validFor: today, team: {}});
      }
      let baylor = game.game.home.names.full.includes("Baylor") ? game.game.home : game.game.away;
      console.log({validFor: today, team: baylor});
      return context.json({validFor: today, team: baylor});
    });
};
