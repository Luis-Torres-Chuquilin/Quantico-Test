import "./style.css";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Bar } from "react-chartjs-2";

const CONTINENTS = gql`
  {
    continents {
      name
      countries {
        name
      }
    }
  }
`;

const DynamicChart = () => {
  // Getting the data form the endpoint : https://countries.trevorblades.com/",
  const { loading, error, data } = useQuery(CONTINENTS);

  if (loading)
    return (
      <div className="loading">
        <p> Loading ... </p>
      </div>
    );
  console.log(data);

  // Empty arrays to save the Continent name and the countries' number in each continent
  const nameContinent = [];
  const numCountries = [];

  const continents = data.continents.map((continent) => {
    numCountries.push(continent.countries.length);
    nameContinent.push(continent.name);
    console.log(continent.countries.length, continent.name);
  });

  console.log("nCounries: ", numCountries, "name: ", nameContinent);
  console.log("number", numCountries[0]);

  const dataHorBar = {
    labels: [
      nameContinent[0],
      nameContinent[3],
      nameContinent[2],
      nameContinent[4],
      nameContinent[5],
      nameContinent[6],
      nameContinent[1],
    ],

    datasets: [
      {
        label: "Number of Countries per Continent",
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 159, 64, 1)"],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          numCountries[0],
          numCountries[3],
          numCountries[2],
          numCountries[4],
          numCountries[5],
          numCountries[6],
          numCountries[1],
        ],
      },
    ],
  };
  return (
    <div>
      <h2
        style={{
          margin: "80px 0",
        }}
      >
        {" "}
        Quantico Test{" "}
      </h2>
      <div className="container">
        <div className="barchar">
          <Bar
            data={dataHorBar}
            type="bar"
            normalized="true"
            options={{
              responsive: true,
              normalized: true,
              title: { text: "N. Countries by Continent", display: true },
              indexAxis: "y",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicChart;

//  //   Africa countries
//  const africa = data.continents.filter(
//     (continent) => continent.name == "Africa"
//   );
//   const africaCountries = africa[0].countries.length;
//   console.log(africaCountries);

//   // Antarctica countries
//   const antarctica = data.continents.filter(
//     (continent) => continent.name == "Antarctica"
//   );
//   const antarcticaCountries = antarctica[0].countries.length;
//   console.log(antarcticaCountries);

//   // Asia countries
//   const asia = data.continents.filter((continent) => continent.name == "Asia");
//   const asiaCountries = asia[0].countries.length;
//   console.log(asiaCountries);

//   // europe countries
//   const europe = data.continents.filter(
//     (continent) => continent.name == "Europe"
//   );
//   const europeCountries = europe[0].countries.length;
//   console.log(europeCountries);

//   // North America countries
//   const northAmerica = data.continents.filter(
//     (continent) => continent.name == "North America"
//   );
//   const northAmericaCountries = northAmerica[0].countries.length;
//   console.log(northAmericaCountries);

//   // Oceania countries
//   const oceania = data.continents.filter(
//     (continent) => continent.name == "Oceania"
//   );
//   const oceaniaCountries = oceania[0].countries.length;
//   console.log(oceaniaCountries);

//   // South America countries
//   const southAmerica = data.continents.filter(
//     (continent) => continent.name == "South America"
//   );
//   const southAmericaCountries = southAmerica[0].countries.length;
//   console.log(southAmericaCountries);
