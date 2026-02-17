import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";


type StoreItemProps = {
  id : number,
  name : string,
  price :number,
  imageURL : string
}

function StoreItem({id, name, price, imageURL} : StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imageURL}
        height="200px"
        style={{objectFit : "cover"}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(id)} className="w-100">Add to Cart</Button>
          ) : 
            <div className="d-flex flex-column align-items-center" style={{gap : "0.5rem"}}>
              <div className="d-flex justify-content-center align-items-center" style={{gap : "0.5rem"}}> 
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                  <div>
                  <span className="fs-3">{quantity}</span> in cart
                  </div>
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          }
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem