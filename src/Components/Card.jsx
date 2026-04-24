import "./Card.css";

function Card({ card }) {
 return (
  <div className="card">
    <img 
    src={card.image} 
    alt={`${card.value} of ${card.suit}`} 
    />
  </div>
);
}

export default Card;