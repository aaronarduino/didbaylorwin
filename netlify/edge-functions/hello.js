export default async (request, context) => {
  let today = await fetch('https://data.ncaa.com/casablanca/schedule/basketball-men/d1/today.json')
    .then((response) => response.json());
  return await fetch('https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/' + today.today + '/scoreboard.json')
    .then((response) => response.json())
    .then((data) => {
      let game = data.games.find((g) => g.game.title.includes("Baylor"));
      if (!game) {
        return context.json({validFor: today.today, team: {}});
      }
      let baylor = game.game.home.names.full.includes("Baylor") ? game.game.home : game.game.away;
      console.log({validFor: today.today, team: baylor});
      return context.json({validFor: today.today, team: baylor});
    });
};
