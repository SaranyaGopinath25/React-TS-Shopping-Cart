import { Container,Nav, Navbar as NavBarBS, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";


function Navbar() {
    const { openCart, cartQuantity} = useShoppingCart();

  return (
    <NavBarBS className="bg-white shadow-sm mb-3">
        <Container>
            <Nav>
                <Nav.Link to="/" as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to="/store" as={NavLink}>
                    Store
                </Nav.Link>
                <Nav.Link to="/about" as={NavLink}>
                    About
                </Nav.Link>
            </Nav>
            <Button  
                onClick = {openCart}
                style={{width: '3rem', height: '3rem', position: 'relative', display: 'flex',justifyContent: 'center'}}
                variant="outline-primary"
                className="rounded-circle"
                >
                <img src="src/assets/shopping-cart.png" alt="Shopping Cart" />
                { cartQuantity > 0 && (
                <div className="bg-danger rounded-circle" style={{color: 'white', width: '1.5rem', height: '1.5rem', position: 'absolute', bottom: 0, right: 0, transform: 'translate(30%, 30%)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {cartQuantity}
                </div>
            )}
            </Button>
        </Container>
    </NavBarBS>
  )
}

export default Navbar