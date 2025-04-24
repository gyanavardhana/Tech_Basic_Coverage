
// fetching api data using async/await
const fetchPokemonData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


fetchPokemonData();