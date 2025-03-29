
const Board = (props) => {
    return (
        <>
            <table
                    id="grid"
                    className="myTable"
                    style={{
                    marginTop: "5%",
                    borderColor: "white",
                    borderWidth: "4px",
                    borderStyle: "solid",
                    marginLeft: "auto",
                    marginRight: "auto"
                    }}
                >
                    <tbody>
                    {props.number.sudoku.row.map((num) => {
                        return (
                        <tr className="row" key={num}>
                            {props.number.sudoku.column.map((num2) => {
                            let key = `${num},${num2}`;
                            return (
                                <td key={key} id="hello" className={`sudokuSlot ${props.number.sudoku.vertical.includes(num) ? "verticalEdge": ""} ${props.number.sudoku.sides.includes(num2) ? "sideEdge" : ""}`}>
                                {/*If props.number for this tile given represent it as a piece of text*/}

                                    <text>{props.number.playerboard[key]}</text>
                            
                                </td>
                            );
                            })}
                        </tr>
                        );
                    })}
                    </tbody>
            </table>
        
        </>
    );
}

export default Board;