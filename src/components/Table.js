import {useEffect, useState} from "react";
import '../global.css';

const Table = () => {
  const [error, setError] = useState(null);
  const [rates, setRates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const rowNames = ["Zkratka", "Platné", "Měna", "Stát", "Počet", "Val nákup", "Val prodej", "Val střed", "Curr nákup", "Curr prodej", "Curr střed", "Pohyb", "ČNB střed", "Verze"]
  const listOfRowNames = rowNames.map(rowName =>
    <th key={rowName}>{rowName}</th>
  )

  useEffect(() => {
    fetch("https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates?web-api-key=c52a0682-4806-4903-828f-6cc66508329e")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRates(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error)
        }
      )
  }, [])
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>LOADING</div>;
    } else {

      const ratesArr = rates.map(rate => Object.values(rate));

      const getEntries = () => {
        return ratesArr.map((rateArr, index) => <tr key={index}>{shapeEntry(rateArr)}</tr>)
      }

      const shapeEntry = (arr) => {
        return arr.map((entry, index) => <td className="Entry" key={index}>{entry}</td>)
      }

      return (
        <div className="Wrapper">
          <table className="Table">
              <thead>
              <tr key={0}>
                {listOfRowNames}
              </tr>
              </thead>
              <tbody>
                {getEntries()}
              </tbody>
          </table>
        </div>
      )
    }
  }

export default Table;
