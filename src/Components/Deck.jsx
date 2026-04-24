import { useEffect, useState } from "react";
import Card from "./Card";
import "./Deck.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
   async function createDeck() {
    try {
      const res = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
      const data = await res.json();

      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    } catch (err) {
      console.error("Error creating deck:", err);
      alert("Failed to load deck. Please refresh.");
    } finally {
      setLoading(false);
    }
  }

  createDeck();
}, []);

  async function drawCard() {
  if (remaining === 0) {
    alert("Error: no cards remaining!");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/${deckId}/draw/?count=1`);
    const data = await res.json();

    setCards(curr => [...curr, data.cards[0]]);
    setRemaining(data.remaining);
  } catch (err) {
    console.error("Error drawing card:", err);
    alert("Failed to draw card.");
  }
}

  async function shuffleDeck() {
  setShuffling(true);

  try {
    const res = await fetch(`${BASE_URL}/${deckId}/shuffle/`);
    const data = await res.json();

    setCards([]);
    setRemaining(data.remaining);
  } catch (err) {
    console.error("Error shuffling deck:", err);
    alert("Failed to shuffle deck.");
  } finally {
    setShuffling(false);
  }
}

  if (loading) return <h1>Loading deck...</h1>;

return (
  <main className="deck-page">
    <section className="deck-panel">
      <h1 className="deck-title">Deck of Cards</h1>
      <p className="deck-subtitle">
        Draw a card, see what you get, and shuffle the deck!
      </p>

      <div className="deck-actions">
        <button className="deck-btn draw-btn" onClick={drawCard} disabled={shuffling}>
          Draw Card
        </button>

        <button className="deck-btn shuffle-btn" onClick={shuffleDeck} disabled={shuffling}>
          {shuffling ? "Shuffling..." : "Shuffle Deck"}
        </button>
      </div>

      <div className="deck-info">
        <div>
          <span className="info-label">Cards Remaining</span>
          <span className="info-value">{remaining}</span>
        </div>

       
      </div>

      <h2 className="cards-title">Drawn Cards</h2>

      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.code} card={card} />
        ))}
      </div>
    </section>
  </main>
);
}

export default Deck;