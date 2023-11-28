import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { calculateWinner } from "../redux/reducers";
import { setSquares } from "../redux/actions";

const Square: React.FC<{ value: string | null; onClick: () => void }> = ({
  value,
  onClick,
}) => (
  <Button style={{ backgroundColor: "#64ff73aa" }} className="square" onClick={onClick}>
    {value}
  </Button>
);

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const squares = useSelector((state: RootState) => state);

  const winner = calculateWinner(squares);
  const xIsNext = squares.filter(Boolean).length % 2 === 0;

  const handleClick = (i: number) => {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    dispatch(setSquares(newSquares));
  };

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <Container>
        {[0, 1, 2].map((row) => (
          <Row key={row} className="board-row">
            {[0, 1, 2].map((col) => (
              <Col key={col}>{renderSquare(row * 3 + col)}</Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Board;
