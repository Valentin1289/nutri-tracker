import Card from "react-bootstrap/Card";
export default function WelcomeCard({ searchNames }) {
  return (
    !searchNames && (
      <Card className="welcome">
        <Card.Img
          variant="top"
          src="https://www.shutterstock.com/image-photo/lets-eat-food-catering-cuisine-260nw-423464437.jpg"
        />
        <div
          style={{
            backgroundColor: "WHITE",
            width: "300px",
            heigth: "200px",
            marginLeft: "300px",
            marginTop: "-30px",
          }}
        >
          .
        </div>
        <Card.Body>
          <Card.Text>
            This app can help you track your daily diet goal. Search for a food
            by it's name or barcode and enjoy it!
          </Card.Text>
        </Card.Body>
      </Card>
    )
  );
}
