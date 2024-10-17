import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function Results({ userInput }) {
    const annualData = calculateInvestmentResults(userInput);
    console.log(annualData);

    let totalInterest = 0;
    return (
        <>
            <table id="result">
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>invested Capital</th>
                </tr>
                </thead>
                <tbody>
                    { annualData.map((row, index) => {
                        totalInterest += row.interest;
                        return <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{formatter.format(row.valueEndOfYear)}</td>
                            <td>{formatter.format(row.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(row.valueEndOfYear - totalInterest)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    );
}
